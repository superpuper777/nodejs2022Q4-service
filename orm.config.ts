import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number.parseInt(process.env.PORT_DB) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + 'migrations/*{.ts,.js}'],
  migrationsRun: true,
  subscribers: [],
};
