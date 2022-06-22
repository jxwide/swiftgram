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

    async create(createPostDto: CreatePostDto, creatorId: number) {
        const user = await this.usersService.findOneById(creatorId)
        if (user) {
            const payload = {creatorId, ...createPostDto}
            return this.postsRepository.save({...payload, creator: user})
        } else return null
    }

    async findById(id: number) {
        return this.postsRepository.findOne({
            where: {id},
            relations: [
                "creator"
            ]
        })
    }
}
