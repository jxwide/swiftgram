import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                username: config.get<string>('TYPEORM_USERNAME'),
                password: config.get<string>('TYPEORM_PASSWORD'),
                database: config.get<string>('TYPEORM_DATABASE'),
                port: config.get<number>('TYPEORM_PORT'),
                entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: true
            })
        }),
        UsersModule,
        AuthModule,
        PhotosModule,
        PostsModule
    ],
})
export class AppModule {}
