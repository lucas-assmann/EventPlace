import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { generateQRCode } from 'src/utils/qr.generator';

@Module({
  controllers: [TicketController],
  providers: [TicketService, generateQRCode],
})
export class TicketModule {}
