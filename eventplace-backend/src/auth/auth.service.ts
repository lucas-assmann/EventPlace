import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { verify } from '@node-rs/argon2';
import {
  ActiveUserException,
  UserNotFoundException,
} from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

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

    if (!user) {
      throw new UserNotFoundException();
    }

    const verifyToken = await this.prisma.sessionList.findFirst({
      where: { userId: user.id },
    });

    if (verifyToken) {
      throw new ActiveUserException();
    }

    const passwordMatch = await verify(user.password, createAuthDto.password);

    if (!passwordMatch) {
      throw new UserNotFoundException();
    }

    if (verifyToken) {
      await this.prisma.sessionList.deleteMany({
        where: { userId: user.id },
      });
    }

    const session = await this.prisma.sessionList.create({
      data: {
        userId: user.id,
        token: await this.jwtService.signAsync({ id: user.id }),
      },
    });

    return { acess_token: session.token };
  }

  async logout(token: string) {
    await this.prisma.sessionList.deleteMany({
      where: { token },
    });

    await this.prisma.blackList.create({
      data: {
        token,
      },
    });

    return 'Deslogado com sucesso!';
  }

  @Cron(CronExpression.EVERY_HOUR)
  async expiredTokenSessionList() {
    const sessions = await this.prisma.sessionList.findMany();

    for (const session of sessions) {
      // eslint-disable-next-line
      const decoded = this.jwtService.decode(session.token) as { exp: number };
      const isExpired = decoded.exp < Math.floor(Date.now() / 1000);

      if (isExpired) {
        await this.prisma.sessionList.deleteMany({
          where: { token: session.token },
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteToken() {
    await this.prisma.blackList.deleteMany({});
  }
}
