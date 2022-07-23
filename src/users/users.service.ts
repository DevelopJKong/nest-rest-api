import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async postJoin({
    name,
    username,
    email,
    password,
    password2,
    region,
    phoneNum,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      if (password !== password2) {
        return {
          ok: false,
          error: '패스워드가 일치하지 않습니다',
        };
      }

      const exists = await this.users.findOne({ email });

      if (exists) {
        return {
          ok: false,
          error: '계정이 이미 존재합니다',
        };
      }

      const user = await this.users.save(
        this.users.create({
          name,
          username,
          email,
          password,
          region,
          phoneNum,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error)
    }
  }
}
