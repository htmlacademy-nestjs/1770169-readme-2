import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@ApiTags('Likes')
@Controller('posts/:postId/like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not logged in.'
  })
  @Post(':id')
  public async toggle(
    @Body() dto: LikeDto,
    @Param('postId') postId: string
  ) {
    await this.likeService.togglePostLike(postId, dto);
  }
}
