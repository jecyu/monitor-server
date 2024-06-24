import { Controller, Post, Body, Get } from '@nestjs/common';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Post('upload')
  uploadData(@Body() body: any) {
    fs.writeFileSync('data.json', JSON.stringify(body.events));
    return { message: 'Data saved' };
  }

  @Post('error-report')
  reportError(@Body() body: any) {
    // TODO 后续支持多个错误信息
    // const errors = fs.existsSync('errors.json')
    //   ? JSON.parse(fs.readFileSync('errors.json', 'utf-8'))
    //   : [];
    // errors.push(body);
    const errors = [body];
    fs.writeFileSync('errors.json', JSON.stringify(errors));
    return { message: 'Error reported' };
  }

  @Get('events')
  getEvents() {
    const data = fs.readFileSync('data.json', 'utf-8');
    return JSON.parse(data);
  }

  @Get('errors')
  getErrors() {
    const data = fs.existsSync('errors.json')
      ? fs.readFileSync('errors.json', 'utf-8')
      : '[]';
    return JSON.parse(data);
  }
}
