import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionEntity } from '../entities/reaction.entity';
import { UsersService } from '../../users/services/users.service';
import { PostsService } from '../../posts/services/posts.service';
import { CreateReactionDto } from '../dto/create-reaction.dto';

@Injectable()
export class ReactionsService {
    constructor(
        @InjectRepository(ReactionEntity)
        private reactionsRepository: Repository<ReactionEntity>,
        private usersService: UsersService,
        private postsService: PostsService,
    ) {
    }

    async newReaction(createReactionDto: CreateReactionDto, postId: number, userId: number) {
        const user = await this.usersService.findOneById(userId);
        const post = await this.postsService.findById(postId);
        if (!user || !post) return null;

        if (createReactionDto.rType == 'like') {
            let likeReactions = await this.reactionsRepository.find({
                relations: ['creator', 'post'],
                where: {
                    creator: { id: userId },
                    rType: 'like',
                },
            });
            if (likeReactions.length != 0) throw new BadRequestException('a reaction of this type can be delivered only 1 time');
        }

        return this.reactionsRepository.save({
            ...createReactionDto,
            creator: user,
            post: post,
        });
    }

    async removeReactionById(id: number, userId?: number) {
        if (userId) {
            // checking whether the user is the owner of the reaction
            const reaction = await this.reactionsRepository.findOne({where: {
                id,
                creator: {id: userId}
            }})
            if (!reaction) throw new BadRequestException('Unauthorized')
        }
        return this.reactionsRepository.delete({id})
    }

    async removeAllUserReactions(userId: number) {
        return this.reactionsRepository.delete({
            creator: {id: userId}
        })
    }

    async removeAllUserReactionsFromPost(userId: number, postId: number) {
        return this.reactionsRepository.delete({
            creator: {id: userId},
            post: {id: postId}
        })
    }
}
