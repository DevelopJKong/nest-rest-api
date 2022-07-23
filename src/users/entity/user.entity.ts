import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CoreEntity } from 'src/common/entities/core.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends CoreEntity {
  @Column()
  avatar: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: false })
  socialOnly: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  phoneNum: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'korea' })
  region: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  expire: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<boolean> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
        return true;
      } catch (error) {
        new InternalServerErrorException();
      }
    }
  }
}
