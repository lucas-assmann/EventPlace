import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  DateInvalidException,
  EventAlreadyExistsException,
  UnauthorizedExceptionRoute,
} from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { GetCep } from 'src/utils/get.cep.utils';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Appropriate_age, EventStatus, Prisma } from 'generated/prisma/client';

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
        banner: createEventDto.banner,
        date: createEventDto.date,
        appropriate_age: createEventDto.appropriate_age,
        max_person_quantity: createEventDto.max_person_quantity,
        cep: createEventDto.cep,
        endAt: createEventDto.endAt,
        cellphone: createEventDto.cellphone,
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
        artists: createEventDto.artistIds
          ? {
              create: createEventDto.artistIds.map((artistId) => ({
                artist: { connect: { id: artistId } },
              })),
            }
          : undefined,
      },
    });
    return 'evento criado com sucesso!';
  }

  async findAll(
    q?: string,
    status?: EventStatus,
    age?: Appropriate_age,
    sort?: string,
  ) {
    const where: Prisma.EventWhereInput = {};

    if (q) {
      where.title = {
        contains: q,
        mode: 'insensitive',
      };
    }

    if (status) {
      where.status = status;
    }

    if (age) {
      where.appropriate_age = age;
    }

    return this.prisma.event.findMany({
      where,
      orderBy: sort === 'NAME' ? { title: 'asc' } : { date: 'asc' },

      include: {
        localization: true,
        ticketType: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        localization: true,
        ticketType: true,
        artists: {
          include: {
            artist: true,
          },
        },
      },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        localization: true,
        ticketType: true,
      },
    });

    if (event!.userId !== userId) {
      throw new UnauthorizedExceptionRoute();
    }

    const { artistIds, ...eventData } = updateEventDto;

    await this.prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        artists: artistIds
          ? {
              deleteMany: {},
              create: artistIds.map((artistId) => ({
                artist: { connect: { id: artistId } },
              })),
            }
          : undefined,
      },
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

  async addArtist(eventId: string, artistId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (event!.userId !== userId) {
      throw new UnauthorizedExceptionRoute();
    }

    await this.prisma.eventArtist.create({
      data: { eventId, userId: artistId },
    });

    return 'Artista adicionado ao evento com sucesso!';
  }

  async removeArtist(eventId: string, artistId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (event!.userId !== userId) {
      throw new UnauthorizedExceptionRoute();
    }

    await this.prisma.eventArtist.delete({
      where: {
        eventId_userId: { eventId, userId: artistId },
      },
    });

    return 'Artista removido do evento com sucesso!';
  }

  async startEvent(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new UnauthorizedExceptionRoute();
    }

    if (event.userId !== userId) {
      throw new UnauthorizedException('Você não é o organizador deste evento.');
    }

    if (event.status !== 'WILL_HAPPEN') {
      throw new BadRequestException('O evento não pode ser iniciado.');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: {
        status: 'ONGOING',
      },
    });

    return updatedEvent;
  }

  async finishEvent(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new UnauthorizedExceptionRoute();
    }

    if (event.userId !== userId) {
      throw new UnauthorizedException('Você não é o organizador deste evento.');
    }

    if (event.status !== 'ONGOING') {
      throw new BadRequestException('O evento não está em andamento.');
    }

    const updatedEvent = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        status: 'FINISHED',
        finishedAt: new Date(),
      },
    });

    return updatedEvent;
  }

  async buscar(termo?: string) {
    if (!termo) {
      return this.prisma.event.findMany({
        orderBy: { date: 'asc' },
      });
    }

    return this.prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: termo, mode: 'insensitive' } },
          { description: { contains: termo, mode: 'insensitive' } },
          { cep: { contains: termo, mode: 'insensitive' } },
          { artist: { contains: termo, mode: 'insensitive' } },
        ],
      },
      orderBy: { date: 'asc' },
    });
  }

  async findMyEvents(userId: string) {
    const events = await this.prisma.event.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        localization: true,
        ticketType: {
          include: {
            _count: {
              select: {
                tickets: {
                  where: {
                    entryStatus: 'ENTERED',
                  },
                },
              },
            },
          },
        },
      },
    });

    const priority = {
      ONGOING: 0,
      WILL_HAPPEN: 1,
      FINISHED: 2,
    };

    return events
      .map((event) => ({
        ...event,
        totalCheckins: event.ticketType.reduce(
          (total, ticketType) => total + ticketType._count.tickets,
          0,
        ),
      }))
      .sort((a, b) => {
        const statusDiff = priority[a.status] - priority[b.status];

        if (statusDiff !== 0) {
          return statusDiff;
        }

        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }
}
