import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('photos')
export class PhotoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    source: string;

    // relations

    @ManyToOne(type => PostEntity, post => post.photos, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinTable()
    post: PostEntity;
}