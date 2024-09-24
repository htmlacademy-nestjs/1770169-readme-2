import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/lib/shared/helpers';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './rdo/comment.dto';
import { CommentService } from './comment.service';
import { DEFAULT_MAX_COMMENT_COUNT } from './comment.constant';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
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
  public async create(
    @Body() dto: CreateCommentDto,
    @Param('postId') postId: string
  ) {
    const newComment = await this.commentService.createComment(postId, dto);

    return fillDto(CommentDto, newComment.toObject());
  }

  @Get('/')
  public async show(
    @Param('postId') postId: string,
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_COMMENT_COUNT), ParseIntPipe) count: number
  ) {
    const comments = await this.commentService.getCommentsByPostId(postId, {count});

    return fillDto(CommentDto, comments.map((comment) => comment.toObject()));
  }

  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not logged in.'
  })
  @Delete('/:id')
  public async destroy(@Param('id') id: string) {
    await this.commentService.deleteCommentById(id);
  }
}
