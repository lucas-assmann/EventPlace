import { Module } from '@nestjs/common';
import { EmailService } from 'src/utils/email';
import { generateQRCode } from 'src/utils/qr.generator';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TicketController],
  providers: [TicketService, generateQRCode, EmailService],
})
export class TicketModule {}
