import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class generateQRCode {
  constructor(private readonly prisma: PrismaService) {}

  async generate(ticketId: string) {
    const code = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    const qrcode = await QRCode.toDataURL(code, { width: 300 });
    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { paymentCode: code },
    });
    return qrcode;
  }
}
