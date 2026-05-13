import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendEmailService {
  private resend: Resend;
  constructor(private configService: ConfigService) {
    this.resend = new Resend(configService.get('RESEND_API_KEY'));
  }

  async sendEmail(email: string) {
    const emailcode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    const url = `http://localhost:3000/verify?code=${emailcode}`;

    const send = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Criação de conta',
      html: `<a href="${url}">Confirmar conta</a>`,
    });

    return console.log(send);
  }
}
