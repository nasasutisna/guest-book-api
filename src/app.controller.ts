import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/hello')
  getHello2(): any {
    return this.appService.getHello2();
  }

  @Post('/generate')
  generateLink(@Body() body: any): any {
    console.log(body);
    return this.appService.generatLinkWA(body?.data);
  }
}
