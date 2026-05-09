import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { verify } from '@node-rs/argon2';
import { UserNotFoundException } from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

interface JwtPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    createAuthDto: CreateAuthDto,
  ): Promise<{ acess_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });

    const passwordMatch = await verify(user!.password, createAuthDto.password);

    if (!passwordMatch || !user) {
      throw new UserNotFoundException();
    }

    return { acess_token: await this.jwtService.signAsync({ id: user.id }) };
  }

  async logout(token: string) {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    const verifyToken = await this.prisma.blackList.create({
      data: {
        userId: payload.id,
        token,
      },
    });

    return verifyToken;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteToken() {
    await this.prisma.blackList.deleteMany({});
  }
}
