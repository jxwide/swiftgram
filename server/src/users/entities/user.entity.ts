import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { ReactionEntity } from '../../reactions/entities/reaction.entity';
import { SubscriptionsEntity } from '../../subs/entities/subs.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    avatarSrc?: string;

    // relations

    @OneToMany(type => PostEntity, post => post.creator)
    posts: PostEntity[];

    @OneToMany(type => ReactionEntity, reaction => reaction.creator)
    reactions: ReactionEntity[];

    @OneToMany(type => SubscriptionsEntity, sub => sub.initiator)
    subscriptions: SubscriptionsEntity[];

    @OneToMany(type => SubscriptionsEntity, sub => sub.target)
    subscribers: SubscriptionsEntity[];
}