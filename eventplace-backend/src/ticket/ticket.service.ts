import { Injectable } from '@nestjs/common';
import {
  EnoughAgeException,
  EnoughTicket,
  InvalidEmailException,
  NotExistTicket,
} from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/utils/email';
import { generateQRCode } from 'src/utils/qr.generator';
import { Appropriate_age, User_age } from './../../generated/prisma/enums';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private qr: generateQRCode,
    private emailService: EmailService,
  ) {}
  async create(createTicketDto: CreateTicketDto, userId: string) {
    const userTicket = await this.prisma.ticketType.findUnique({
      where: {
        id: createTicketDto.ticketTypeId,
      },
      include: {
        event: true,
      },
    });

    if (!userTicket) {
      throw new NotExistTicket();
    }

    if (userTicket.quantity === 0) {
      throw new EnoughTicket();
    }

    if (userTicket.event.appropriate_age === Appropriate_age.ADULT) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.age === User_age.MINOR) {
        throw new EnoughAgeException();
      }
    }

    const buyTicket = await this.prisma.ticket.create({
      data: {
        ...createTicketDto,
        userId,
      },
    });

    await this.prisma.ticketType.update({
      where: {
        id: createTicketDto.ticketTypeId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    return buyTicket;
  }

  async generateQRCode(ticketId: string) {
    const qrcode = await this.qr.generate(ticketId);

    return qrcode;
  }

  async ConfirmPayment(code: string, userId: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        paymentCode: code,
        userId,
      },
    });

    if (ticket === null) {
      throw new NotExistTicket();
    }

    await this.prisma.ticket.updateMany({
      where: {
        paymentCode: code,
      },
      data: {
        status: 'CONFIRMED',
      },
    });

    await this.prisma.ticketType.update({
      where: {
        id: ticket.ticketTypeId,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    const userEmail = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const ticketEmailData = await this.prisma.ticket.findUnique({
      where: {
        id: ticket.id,
      },
      include: {
        ticketType: { include: { event: { include: { user: true } } } },
      },
    });

    if (!userEmail || !ticketEmailData) {
      throw new InvalidEmailException();
    }

    await this.emailService.sendTicketEmail({
      email: userEmail.email,
      title: userEmail.name,
      ticketType: ticketEmailData.ticketType.name,
      eventName: ticketEmailData.ticketType.event.title,
      day: ticketEmailData.ticketType.event.date.toDateString(),
      price: ticketEmailData.ticketType.price.toNumber(),
    });

    return 'Pagamento confirmado e enviado para o email do usuário';
  }

  async findAll(userId: string) {
    const allUserTicket = await this.prisma.ticket.findMany({
      where: {
        userId,
      },
    });

    return allUserTicket;
  }

  async findOne(id: string, userId: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (ticket === null) {
      throw new NotExistTicket();
    }

    return ticket;
  }

  async findByName(name: string, userId: string) {
    const searchTicketTypeByUser = await this.prisma.ticket.findMany({
      where: {
        userId,
        ticketType: {
          name,
        },
      },
      include: {
        ticketType: true,
      },
    });
    return searchTicketTypeByUser;
  }
}
