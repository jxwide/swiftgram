import { Module } from '@nestjs/common';
import { SubsController } from './controllers/subs.controller';
import { SubsService } from './services/subs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsEntity } from './entities/subs.entity';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [SubsController],
    providers: [SubsService],
    imports: [
        TypeOrmModule.forFeature([SubscriptionsEntity]),
        UsersModule,
    ],
})
export class SubsModule {
}
