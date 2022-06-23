import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Raw, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private usersService: UsersService,
    ) {
    }

    async create(createPostDto: CreatePostDto, creatorId: number) {
        const user = await this.usersService.findOneById(creatorId);
        if (user) {
            const payload = { creatorId, ...createPostDto };
            return this.postsRepository.save({ ...payload, creator: user });
        } else return null;
    }

    async delete(postId: number, userId: number) {
        const post = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['creator'],
        });
        if (post.creator.id != userId) throw new BadRequestException('unauthorized');
        return this.postsRepository.delete({ id: postId });
    }

    async findById(id: number) {
        return this.postsRepository.findOne({
            where: { id },
            relations: ['creator'],
        });
    }

    async findAll() {
        return this.postsRepository.find({
            relations: ['creator', 'reactions'],
        });
    }

    async getMonthlyPosts() {
        let currentDate = new Date();
        let month = currentDate.setMonth(currentDate.getMonth() - 1);
        let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        return this.postsRepository.find({
            where: {
                createdAt: Raw((alias) => `${alias} > :date`, { date: dateString }),
            },
        });
    }

    async getPostsByDate(range: 'year' | 'month' | 'week' | 'day' = 'month') {
        let currentDate = new Date();
        if (range == 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (range == 'week') {
            currentDate.setDate(currentDate.getDate() - 7);
        } else if (range == 'day') {
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (range == 'year') {
            currentDate.setFullYear(currentDate.getFullYear() - 1);
        }
        let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        return this.postsRepository.find({
            where: {
                createdAt: Raw((alias) => `${alias} > :date`, { date: dateString }),
            },
        });
    }
}
