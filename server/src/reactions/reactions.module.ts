import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from './entities/reaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReactionEntity])
    ]
})
export class ReactionsModule {}
