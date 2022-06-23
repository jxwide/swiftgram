import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionEntity } from '../entities/reaction.entity';
import { UsersService } from '../../users/services/users.service';
import { PostsService } from '../../posts/services/posts.service';

@Injectable()
export class ReactionsService {
    constructor(
        @InjectRepository(ReactionEntity)
        private reactionsRepository: Repository<ReactionEntity>,
        private usersService: UsersService,
        private postsService: PostsService
    ) {
    }

    async newReaction(rType: string, postId: number, userId: number) {
        const user = await this.usersService.findOneById(userId)
        const post = await this.postsService.findById(postId)
        const reaction = await this.reactionsRepository.save({
            rType,
            creator: user,
            post
        })
        return reaction
    }
}
