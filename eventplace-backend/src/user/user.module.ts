import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email';
import { GetCep } from 'src/utils/get.cep.utils';
import { UserAge } from 'src/utils/user.age';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [
    UserService,
    GetCep,
    ConfigService,
    EmailService,
    JwtService,
    UserAge,
  ],
})
export class UserModule {}
