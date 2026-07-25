import { Injectable } from '@nestjs/common';
import {
  EntryStatus,
  EventStatus,
  Status_Ticket,
} from 'generated/prisma/client';
import {
  CannotRateException,
  UnauthorizedExceptionRoute,
} from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async canRate(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new UnauthorizedExceptionRoute();
    }

    if (event.status !== EventStatus.FINISHED) {
      return { canRate: false };
    }

    if (!event.finishedAt) {
      return { canRate: false };
    }

    const limit = new Date(event.finishedAt);
    limit.setHours(limit.getHours() + 24);

    if (new Date() > limit) {
      return { canRate: false };
    }

    const ticket = await this.prisma.ticket.findFirst({
      where: {
        userId,
        status: Status_Ticket.CONFIRMED,
        entryStatus: EntryStatus.ENTERED,
      },
      include: {
        ticketType: true,
      },
    });

    if (!ticket) {
      return { canRate: false };
    }

    if (ticket.ticketType.eventId !== eventId) {
      return { canRate: false };
    }

    const rating = await this.prisma.rating.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (rating) {
      return { canRate: false };
    }

    return {
      canRate: true,
    };
  }

  async create(dto: CreateRatingDto, userId: string) {
    const canRate = await this.canRate(dto.eventId, userId);

    if (!canRate.canRate) {
      throw new CannotRateException();
    }

    return this.prisma.rating.create({
      data: {
        eventId: dto.eventId,
        userId,
        stars: dto.stars,
        comment: dto.comment,
      },
    });
  }
}
