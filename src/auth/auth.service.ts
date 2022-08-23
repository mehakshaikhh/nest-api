import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from 'src/users/users.entity';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}
    
    async validateUser(encryptedPassword: string, enteredPassword: string): Promise<boolean>{
        return await bcrypt.compare(enteredPassword, encryptedPassword);
    }

    login(user: User): Token {        
        const payload = { email: user.email, sub: user.id };
        return {accessToken: this.jwtService.sign(payload)};
    }
}
