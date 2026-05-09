import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { extractTokenFromHeader } from 'src/utils/auth.utils';
import { Public } from 'src/utils/public.decorator';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.validateUser(createAuthDto);
  }

  @Post('logout')
  logout(@Req() request: Request) {
    const token = extractTokenFromHeader(request);
    return this.authService.logout(token!);
  }
}
