import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('subs')
export class SubscriptionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => UserEntity, user => user.subscriptions)
    @JoinTable()
    initiator: UserEntity;

    @ManyToOne(type => UserEntity, user => user.subscriptions)
    @JoinTable()
    target: UserEntity;
}