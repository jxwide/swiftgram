import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) return null;
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign(user),
        };
    }

    async singup(createUserDto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(createUserDto.password, 3);
        const {password, ...payload} = createUserDto
        const user = await this.usersService.create({...payload, password: hashPassword})
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
