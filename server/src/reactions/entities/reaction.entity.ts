import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable, ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('reactions')
export class ReactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 'like' })
    rType: string; // like || comment || ...other

    @Column({ nullable: true })
    text?: string; // only for comment

    // relations

    @ManyToOne(type => UserEntity, user => user.reactions, { cascade: true })
    @JoinTable()
    creator: UserEntity;

    @ManyToOne(type => PostEntity, post => post.reactions, { cascade: true })
    @JoinTable()
    post: PostEntity;
}