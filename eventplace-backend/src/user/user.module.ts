import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetCep } from 'src/utils/get.cep.utils';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ResendEmailService } from 'src/utils/resend.email';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [
    UserService,
    GetCep,
    ConfigService,
    ResendEmailService,
    JwtService,
  ],
})
export class UserModule {}
