import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  login: string;

  @Column()
  password: string;

  @Column('int')
  version: number;

  @Column('timestamp')
  createdAt: number;

  @Column('timestamp')
  updatedAt: number;
}
