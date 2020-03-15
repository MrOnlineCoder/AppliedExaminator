import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  apiStatus() {
    return {
      alive: true,
      version: 1,
      timestamp: Date.now()
    };
  }
}
