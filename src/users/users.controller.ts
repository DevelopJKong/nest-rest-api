import { Render } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

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
