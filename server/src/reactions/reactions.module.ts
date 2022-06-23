import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from './entities/reaction.entity';
import { ReactionsService } from './services/reactions.service';
import { ReactionsController } from './controllers/reactions.controller';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReactionEntity]),
        UsersModule,
        PostsModule,
    ],
    providers: [ReactionsService],
    controllers: [ReactionsController],
})
export class ReactionsModule {
}
