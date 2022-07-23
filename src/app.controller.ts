import { UserService } from './users/users.service';
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAccountInput, CreateAccountOutput } from './users/dto/create-account.dto';

@Controller("/")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render('home')
  getHome() {
    return this.appService.getHello();
  }

  @Get('/join')
  @Render('join')
  getJoin() {}

  @Post('/join')
  async postJoin(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.postJoin(createAccountInput);
  }
}
