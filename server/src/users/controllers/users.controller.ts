import {Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import {UpdateSecInfoDto} from "../dto/update-sec-info.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/info')
    updateUserInfo(@Body() updateSecInfoDto: UpdateSecInfoDto, @Request() req) {
        return this.usersService.updateSecondaryInfo(updateSecInfoDto, req.user.id)
    }

    // endpoints for test
    @Get('findall')
    findAll() {
        return this.usersService.findAll()
    }
}
