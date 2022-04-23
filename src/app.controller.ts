import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/generate')
  generateLink(@Body() body: any): any {
    console.log(body);
    return this.appService.generatLinkWA(body?.data);
  }
}
