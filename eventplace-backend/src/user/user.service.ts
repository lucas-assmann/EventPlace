import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsException } from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { hashPassword } from 'src/utils/hash.password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
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

    await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
        birthDate: createUserDto.birthDate,
        avatar: createUserDto.avatar,
        rating: createUserDto.rating,
      },
    });

    return 'Usuário criado com sucesso!';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return `This action removes a #${id} user`;
  }
}
