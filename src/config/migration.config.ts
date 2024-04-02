import { DataSource, DataSourceOptions } from 'typeorm';

const typeORMConfig: DataSourceOptions = {
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
};

const dataSource = new DataSource(typeORMConfig);
dataSource.initialize();
export default dataSource;
