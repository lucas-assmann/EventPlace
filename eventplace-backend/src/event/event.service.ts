import { Injectable } from '@nestjs/common';
import {
  DateInvalidException,
  EventAlreadyExistsException,
  UnauthorizedExceptionRoute,
} from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { GetCep } from 'src/utils/get.cep.utils';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private getCep: GetCep,
  ) {}
  async create(createEventDto: CreateEventDto, userId: string) {
    const response = await this.getCep.getCep(createEventDto.cep);

    const eventExist = await this.prisma.event.findFirst({
      where: { title: createEventDto.title },
    });

    if (eventExist) {
      throw new EventAlreadyExistsException();
    }

    if (
      createEventDto.date < new Date() ||
      createEventDto.endAt < new Date() ||
      createEventDto.date > createEventDto.endAt
    ) {
      throw new DateInvalidException();
    }

    await this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        banner: createEventDto.banner!,
        date: createEventDto.date,
        appropriate_age: createEventDto.appropriate_age,
        max_person_quantity: createEventDto.max_person_quantity,
        cep: createEventDto.cep,
        endAt: createEventDto.endAt,
        localization: {
          create: {
            state: response.estado,
            city: response.localidade,
            street: response.logradouro,
            number: createEventDto.number,
            neighborhood: response.bairro,
          },
        },
        userId,
        ticketType: {
          createMany: {
            data: createEventDto.ticketType,
          },
        },
      },
    });
    return 'evento criado com sucesso!';
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (event!.userId !== userId) {
      throw new UnauthorizedExceptionRoute();
    }

    await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
    return `Evento atualizado com sucesso!`;
  }

  async remove(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (event!.userId !== userId) {
      throw new UnauthorizedExceptionRoute();
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return `Evento excluído com sucesso!`;
  }
}
