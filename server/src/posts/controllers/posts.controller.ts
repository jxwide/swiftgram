import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
        return this.postsService.create(createPostDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postId')
    deletePost(@Param('postId', ParseIntPipe) postId, @Request() req) {
        return this.postsService.delete(postId, req.user.id);
    }

    @Get('date/:range')
    getPostsByDate(@Param('range') dateRange) {
        if (dateRange != 'year' && dateRange != 'month' && dateRange != 'week' && dateRange != 'day') {
            throw new BadRequestException('bad date range');
        } else return this.postsService.getPostsByDate(dateRange);
    }

    // @Get('findall')
    // test2() {
    //     return this.postsService.findAll();
    // }
}
