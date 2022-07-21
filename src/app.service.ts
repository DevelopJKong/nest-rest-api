import { Get, Injectable, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

  getHello() {
    return { message: 'Hello' };
  }



}
