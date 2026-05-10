import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { extractTokenFromHeader } from 'src/utils/auth.utils';
import { Public } from 'src/utils/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

interface AuthRequest extends Request {
  user: JwtPayload;
}

interface JwtPayload {
  id: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  update(@Req() request: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    const id = request.user.id;
    return this.userService.update(id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete()
  remove(@Req() request: AuthRequest) {
    const user = request.user;
    const token = extractTokenFromHeader(request);

    return this.userService.remove(user.id, token!);
  }
}
