import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusGateway } from './status/status.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly statusGateway: StatusGateway) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
