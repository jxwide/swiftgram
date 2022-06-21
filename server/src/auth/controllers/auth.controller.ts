import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('prof')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('singup')
    async singup(@Body() createUserDto: CreateUserDto) {
        return this.authService.singup(createUserDto)
    }
}
