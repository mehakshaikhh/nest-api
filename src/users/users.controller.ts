import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, UnauthorizedException, UseGuards, } from '@nestjs/common';

import 'dotenv/config';
import { plainToClass } from 'class-transformer';

import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Token } from 'src/auth/interfaces/token.interface';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ){}
    
    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto>{
        const condition = {
            where: {
                email: createUserDto.email,
            }
        };

        const user = await this.userService.findOne(condition);
        if(user) throw new BadRequestException('Email Already Exists');

        return plainToClass(UserResponseDto, await this.userService.createUser(createUserDto)); ;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<Token>{
        const condition = {
            where: {
                email: loginDto.email,
            }
        };

        const user = await this.userService.findOne(condition);    

        if(!user) throw new UnauthorizedException('Unauthorized Access');

        if(!await this.authService.validateUser(user.password, loginDto.password))
            throw new UnauthorizedException('Unauthorized Access');

        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async getUser(@Param('email') email: string): Promise<UserResponseDto>{
        const condition = {
            where: {
                email: email,
            }
        };
        const user = await this.userService.findOne(condition);
        if(!user) throw new NotFoundException('User Not Found');

        return plainToClass(UserResponseDto, user);
    }

}
