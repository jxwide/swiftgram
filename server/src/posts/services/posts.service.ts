import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private usersService: UsersService
    ) {}

    async create(createPostDto: CreatePostDto) {
        const user = await this.usersService.findOneById(createPostDto.creatorId)
        const {creatorId, ...postPayload} = createPostDto
        return this.postsRepository.save({...postPayload, creator: user})
    }
}
