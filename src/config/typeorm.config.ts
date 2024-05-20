import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/migration/*{.ts,.js}'],
  logging: true,
  logger: 'file',
  autoLoadEntities: true,
  timezone: 'local',
};

export default typeORMConfig;
