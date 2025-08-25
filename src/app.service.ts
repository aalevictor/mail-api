import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class AppService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    });
  }

  async sendEmail({
    from,
    to,
    bcc,
    subject,
    text,
    html,
  }: {
    from: string;
    to: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
  }) {
    try {
      const result = await this.transporter.sendMail({
        from,
        to,
        bcc,
        subject,
        html,
        text,
      });
      console.log(result);
      return {
        success: true,
        message: 'Email enviado com sucesso',
        data: {
          from,
          to,
          bcc,
          subject,
          text,
          html,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
