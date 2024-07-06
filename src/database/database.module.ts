import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import typeORMConfig from 'src/config/typeorm.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }
}
