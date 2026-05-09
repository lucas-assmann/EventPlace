import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetCep } from 'src/utils/get.cep.utils';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, GetCep],
})
export class UserModule {}
