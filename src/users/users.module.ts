import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [SequelizeModule.forFeature([User]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService,],
})
export class UsersModule {}
