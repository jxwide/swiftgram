import { Controller, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }


    // endpoints for test
    @Get('findall')
    findAll() {
        return this.usersService.findAll()
    }
}
