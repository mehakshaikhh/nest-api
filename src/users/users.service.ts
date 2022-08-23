import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel(User)
        private userModel: typeof User
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { firstName, lastName, email } = createUserDto;

        return await this.userModel.create({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    async findOne(condition:any): Promise<User> {
        return await this.userModel.findOne(condition);
    }
   
}
