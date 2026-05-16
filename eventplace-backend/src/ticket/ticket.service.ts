import { Injectable } from '@nestjs/common';
import { EnoughTicket, NotExistTicket } from 'src/errors/user.error';
import { PrismaService } from 'src/prisma.service';
import { generateQRCode } from 'src/utils/qr.generator';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private qr: generateQRCode,
  ) {}
  async create(createTicketDto: CreateTicketDto, userId: string) {
    const userTicket = await this.prisma.ticketType.findUnique({
      where: {
        id: createTicketDto.ticketTypeId,
      },
    });

    if (userTicket === null) {
      throw new NotExistTicket();
    }

    if (userTicket?.quantity === 0) {
      throw new EnoughTicket();
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

    return 'Pagamento confirmado';
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
