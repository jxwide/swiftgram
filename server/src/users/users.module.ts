import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { ReactionEntity } from '../reactions/entities/reaction.entity';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            ReactionEntity,
        ]),
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule {
}
