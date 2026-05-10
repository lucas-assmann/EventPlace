import { Injectable } from '@nestjs/common';
import { GetCep } from 'src/utils/get.cep.utils';
import { ResendEmailService } from 'src/utils/resend.email';
import { UserAlreadyExistsException } from '../errors/user.error';
import { PrismaService } from '../prisma.service';
import { hashPassword } from '../utils/hash.password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private getCep: GetCep,
    private resend: ResendEmailService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const response = await this.getCep.getCep(createUserDto.cep);

    // await this.resend.sendEmail(createUserDto.email);

    await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
        birthDate: createUserDto.birthDate,
        avatar: createUserDto.avatar,
        cep: createUserDto.cep,
        localization: {
          create: {
            state: response.estado,
            city: response.localidade,
            street: response.logradouro,
            number: createUserDto.number,
            neighborhood: response.bairro,
          },
        },
      },
    });

    return 'Usuário criado com sucesso!';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return `Usuário atualizado com sucesso!`;
  }
  async remove(id: string, token: string) {
    await this.prisma.user.delete({
      where: { id },
    });

    await this.prisma.blackList.create({
      data: {
        token,
      },
    });

    return `Excluído com sucesso!`;
  }
}
