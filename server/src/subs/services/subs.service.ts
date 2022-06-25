import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionsEntity } from '../entities/subs.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class SubsService {
    constructor(
        @InjectRepository(SubscriptionsEntity)
        private subsRepository: Repository<SubscriptionsEntity>,
        private usersService: UsersService,
    ) {
    }

    async newSubscription(userId: number, targetId: number) {
        let user = await this.usersService.findOneById(userId);
        let target = await this.usersService.findOneById(targetId);
        if (!user || !target) return null;

        let doubleSub = !!(await this.subsRepository.findOne({
            where: {
                initiator: { id: user.id },
                target: { id: target.id },
            },
        }));
        if (doubleSub) throw new BadRequestException('the subscription has already been issued');

        return this.subsRepository.save({
            initiator: user,
            target,
        });
    }

    async removeSubscription(subId: number, userId?: number) {
        const subscription = await this.subsRepository.findOne({
            where: {id: subId},
            relations: ['initiator']
        })
        if (!subscription) throw new BadRequestException('subscription not found')
        if (userId && subscription.initiator.id != userId) throw new BadRequestException('unauthorized')
        return this.subsRepository.delete({id: subId})
    }

    async findAndRemoveSubscription(initiatorId: number, targetId: number) {
        const subscription = await this.subsRepository.findOne({
            where: {
                initiator: {id: initiatorId},
                target: {id: targetId}
            },
            relations: ['initiator', 'target']
        })
        if (!subscription) throw new BadRequestException('subscription not found')
        return this.subsRepository.delete({id: subscription.id})
    }
}
