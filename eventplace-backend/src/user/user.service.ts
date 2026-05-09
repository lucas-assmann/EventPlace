import { Injectable } from '@nestjs/common';
import { GetCep } from 'src/utils/get.cep.utils';
import { UserAlreadyExistsException } from '../errors/user.error';
import { PrismaService } from '../prisma.service';
import { hashPassword } from '../utils/hash.password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private getCep: GetCep,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const response = await this.getCep.getCep(createUserDto.cep);

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
          },
        },
      },
    });

    return 'Usuário criado com sucesso!';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return `Excluído com sucesso!`;
  }
}
