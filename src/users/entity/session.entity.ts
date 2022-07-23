import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  sid: string;

  @Column()
  sess: string;

  @Column()
  expire: Date;
}
