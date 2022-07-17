import { Get, Injectable, Render } from '@nestjs/common';

@Injectable()
export class AppService {

  @Get()
  getHello() {
    return { message: 'Hello' };
  }
}
