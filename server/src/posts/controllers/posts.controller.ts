import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post('new')
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto)
    }
}
