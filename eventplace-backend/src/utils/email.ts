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

    const url = `http://localhost:5173/confirm-email?code=${code}`;

    await this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Verificação de email',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirme sua conta</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 40px 0;">
            <tr>
              <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color: #18181b; border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.2); overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #7C3AED, #a855f7); padding: 32px 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                        Confirme sua conta
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 16px; color: #e4e4e7; font-size: 15px; line-height: 1.6;">
                        Olá! 👋
                      </p>
                      <p style="margin: 0 0 24px; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                        Falta só um passo para começar a usar sua conta. Clique no botão abaixo para confirmar seu e-mail:
                      </p>

                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                          <td style="border-radius: 8px; background-color: #7C3AED;">
                            <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                              Confirmar conta
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 32px 0 0; color: #71717a; font-size: 13px; line-height: 1.6;">
                        Se o botão não funcionar, copie e cole este link no seu navegador:
                      </p>
                      <p style="margin: 8px 0 0; word-break: break-all;">
                        <a href="${url}" style="color: #a855f7; font-size: 13px;">${url}</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                      <p style="margin: 0; color: #52525b; font-size: 12px; line-height: 1.5;">
                        Se você não criou essa conta, pode ignorar este e-mail com segurança.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
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
