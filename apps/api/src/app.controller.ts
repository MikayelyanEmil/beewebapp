import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Res() res) {
    let hello = this.appService.getHello();
    console.log(req.cookies.refresh_token)
    res.cookie('refresh_token', hello, { maxAge: 900000, httpOnly: true });
    res.send({ hello });
  }
}
