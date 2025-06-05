import { DataSource } from 'typeorm';
import * as entities from './src/entities';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: Object.values(entities),
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
}); 