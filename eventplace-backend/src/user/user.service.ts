import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  InvalidUserCepException,
  UserAlreadyExistsException,
} from '../errors/user.error';
import { PrismaService } from '../prisma.service';
import { hashPassword } from '../utils/hash.password';
import { AddressResponse, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Passar para outro lugar
    const userExists = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    // Melhorar essa parte (Tentar deixar reutilizável)
    // Código muito poluído
    const response = await firstValueFrom(
      this.httpService.get<AddressResponse>(
        `https://viacep.com.br/ws/${createUserDto.cep}/json/`,
      ),
    );

    if (response.data.erro) {
      throw new InvalidUserCepException();
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: await hashPassword(createUserDto.password),
        birthDate: createUserDto.birthDate,
        avatar: createUserDto.avatar,
        rating: createUserDto.rating,
        cep: createUserDto.cep,
      },
    });

    await this.prisma.user_localization.create({
      data: {
        userId: user.id,
        city: response.data.localidade,
        street: response.data.logradouro,
        state: response.data.estado,
      },
    });

    return 'Usuário criado com sucesso!';
  }

  async findOne(id: string) {
    await this.prisma.user.findUnique({ where: { id } });
    return `Este é o #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return `Excluído com sucesso!`;
  }
}
