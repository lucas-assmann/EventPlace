import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from '@node-rs/argon2';
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

    // Arrumar para melhorar, simplificar os if's
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await verify(user.password, createAuthDto.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return { acess_token: await this.jwtService.signAsync({ id: user.id }) };
  }
}
