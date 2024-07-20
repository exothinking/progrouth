import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `Running on: ${String(process.env.NODE_ENV)}`;
  }
}
