import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
    }

    async findOne(username: string) {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findOneById(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findAll() {
        return this.usersRepository.find({
            relations: ['posts', 'reactions.creator', 'reactions.post'],
        });
    }

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }
}
