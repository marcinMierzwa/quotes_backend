
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dtos/like.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}


   //Toggle like 'http://localhost:3000/likes/toggle'
 
  @UseGuards(JwtAuthGuard)
  @Post('toggle')
  async toggleLike(@Request() req, @Body() likeDto: LikeDto) {
    const userId = req.user.id;
    return await this.likesService.toggleLike(
      userId,
      likeDto.quoteId,
    );
  }
}