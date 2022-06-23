import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { UsersModule } from '../users/users.module';
import { ReactionEntity } from '../reactions/entities/reaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostEntity,
            ReactionEntity,
        ]),
        UsersModule,
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule {
}
