import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { PrismaService } from 'src/prisma.service';

interface TicketEmailData {
  email: string;
  title: string;
  ticketType: string;
  eventName: string;
  day: string;
  price: number;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('GMAIL_USER'),
        pass: this.configService.get('GMAIL_APP_PASSWORD'),
      },
    });
  }

  async sendEmail(email: string, userId: string) {
    const code = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    const url = `http://localhost:3000/user/verify?code=${code}`;

    await this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Criação de conta',
      html: `<a href="${url}">Confirmar conta</a>`,
    });

    await this.prisma.user_verification.create({
      data: {
        code,
        userId,
      },
    });
  }

  async sendTicketEmail(data: TicketEmailData) {
    const { email, title, ticketType, eventName, day, price } = data;
    await this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: `Compra de ingresso para ${eventName} efetuada com sucesso!`,
      html: `<p>Olá, ${title}!</p><p>A compra do ingresso ${ticketType} no valor de R$ ${price.toFixed(2)} do evento ${eventName} no dia ${day} foi efetuada com sucesso!</p>`,
    });
  }
}
