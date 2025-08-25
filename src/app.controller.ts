import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Post('send-email')
  async sendEmail(@Body() body: { 
    to: string | string[]; 
    subject: string;
    text?: string;
    html?: string;
    from: string;
    bcc?: string | string[];
  }) {
    return await this.appService.sendEmail(body);
  }
}
