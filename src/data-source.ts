import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env';
import { Product } from './database/entities/Product';
import { ProductCategory } from './database/entities/ProductCategory';
import { ProductSituation } from './database/entities/ProductSituation';
import { Situation } from './database/entities/Situation';
import { User } from './database/entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  logging: env.db.logging,
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: [Situation, User, ProductCategory, ProductSituation, Product],
  migrations: ['src/database/migrations/*{.ts,.js}']
});
