import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserV1 } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserV1])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
