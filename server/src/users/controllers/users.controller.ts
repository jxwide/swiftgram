import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // endpoints for test
    @Get('findall')
    findAll() {
        return this.usersService.findAll()
    }
}
