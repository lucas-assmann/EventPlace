import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/utils/email';
import { GetCep } from 'src/utils/get.cep.utils';
import { UserAge } from 'src/utils/user.age';
import {
  DateInvalidException,
  EmailOrCodeInvalidException,
  UserAlreadyExistsException,
} from '../errors/user.error';
import { PrismaService } from '../prisma.service';
import { hashPassword } from '../utils/hash.password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private getCep: GetCep,
    private email: EmailService,
    private user_age: UserAge,
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

    const userAge = this.user_age.getAge(createUserDto.birthDate);

    if (!userAge) {
      throw new DateInvalidException();
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
        birthDate: createUserDto.birthDate,
        avatar: createUserDto.avatar,
        cep: createUserDto.cep,
        age: userAge,
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

    await this.email.sendEmail(createUserDto.email, user.id);

    return 'Usuário criado com sucesso!';
  }

  async verifyEmail(code: string) {
    const user = await this.prisma.user_verification.findUnique({
      where: { code },
    });

    if (!user) {
      throw new EmailOrCodeInvalidException();
    }

    await this.prisma.user.update({
      where: { id: user.userId },
      data: { isVerified: true },
    });

    await this.prisma.user_verification.delete({
      where: { id: user.id },
    });
    return `Email verificado com sucesso!`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userAge = this.user_age.getAge(updateUserDto.birthDate!);

    await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        username: updateUserDto.username,
        email: updateUserDto.email,
        birthDate: updateUserDto.birthDate,
        avatar: updateUserDto.avatar,
        cep: updateUserDto.cep,
        age: userAge,
      },
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
