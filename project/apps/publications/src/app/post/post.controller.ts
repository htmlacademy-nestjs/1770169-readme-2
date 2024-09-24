import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/lib/shared/helpers';
import { PostRdo } from './rdo/post.rdo';
import { PostType, SortType } from '@project/lib/shared/app/types';
import { DEFAULT_MAX_POST_COUNT } from './post.constant';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Publications')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not logged in.'
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost({...dto, userId: '66e87f4f646c29eff76565a8'});

    return fillDto(PostRdo, newPost.toObject(), {exposeDefaultValues: false});
  }

  @Post('/:id/repost')
  public async repost(
    @Param('id') id: string
  ) {
    const newPost = await this.postService.repostPost(id, '66e9d8681f48c49323a88c87');

    return fillDto(PostRdo, newPost.toObject(), {exposeDefaultValues: false});
  }

  @Get('/')
  public async index(
    @Query('type', new DefaultValuePipe(undefined)) type: PostType,
    @Query('tagName', new DefaultValuePipe('#горы')) tagName: string,
    @Query('userId', new DefaultValuePipe(undefined)) userId: string,
    @Query('sort', new DefaultValuePipe(SortType.Desc)) sort: SortType,
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_POST_COUNT), ParseIntPipe) count: number
  ) {
    const posts = await this.postService.getAllPosts({type, tagName, userId, sort, count});

    return fillDto(PostRdo, posts.map((post) => post.toObject()), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not logged in.'
  })
  @Get('/draft')
  @HttpCode(200)
  public async getDrafts(
    @Query('sort', new DefaultValuePipe(SortType.Desc)) sort: SortType,
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_POST_COUNT), ParseIntPipe) count: number
  ) {
    const posts = await this.postService.getPostsByDraftStatus({sort, count});

    return fillDto(PostRdo, posts.map((post) => post.toObject()), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The post with this id not found.'
  })
  @Get('/:id')
  @HttpCode(200)
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    return fillDto(PostRdo, post.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The post with this id not found.'
  })
  @Patch('/:id')
  @HttpCode(200)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto
  ) {
    const updatedPost = await this.postService.updatePostById(id, dto);

    return fillDto(PostRdo, updatedPost.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The post with this id not found.'
  })
  @Delete('/:id')
  @HttpCode(200)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePostById(id);
  }
}
