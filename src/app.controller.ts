import { Controller, Post, Body, Get } from '@nestjs/common';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Post('upload')
  uploadData(@Body() body: any) {
    fs.writeFileSync('data.json', JSON.stringify(body.events));
    return { message: 'Data saved' };
  }

  @Get('events')
  getEvents() {
    const data = fs.readFileSync('data.json', 'utf-8');
    return JSON.parse(data);
  }
}
