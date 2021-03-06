import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PhotoEntity } from '../../photos/entities/photo.entity';
import { ReactionEntity } from '../../reactions/entities/reaction.entity';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    description?: string;

    // relations
    // photos, likes, comments, creatorId

    @ManyToOne(type => UserEntity, creator => creator.posts, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinTable()
    creator: UserEntity;

    @OneToMany(type => PhotoEntity, photo => photo.post)
    photos: PhotoEntity[];

    @OneToMany(type => ReactionEntity, reaction => reaction.creator)
    reactions: ReactionEntity[];
}