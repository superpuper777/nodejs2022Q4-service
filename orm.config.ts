import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from './src/entity/User';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: Number.parseInt(process.env.PORT_DB) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
};
