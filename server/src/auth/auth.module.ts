import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
                    },
                };
            },
        }),
    ],
    exports: [AuthService],
})
export class AuthModule {
}
