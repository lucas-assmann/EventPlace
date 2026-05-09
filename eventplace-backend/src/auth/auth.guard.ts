import type { ExecutionContext } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedExceptionRoute } from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { extractTokenFromHeader } from 'src/utils/auth.utils';
import { IS_PUBLIC_KEY } from 'src/utils/public.decorator';

interface JwtPayload {
  id: string;
}
interface AuthRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedExceptionRoute();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request['user'] = payload;

      const blacklisted = await this.prisma.blackList.findFirst({
        where: { token },
      });
      if (blacklisted) {
        throw new UnauthorizedExceptionRoute();
      }
    } catch {
      throw new UnauthorizedExceptionRoute();
    }

    return true;
  }
}
