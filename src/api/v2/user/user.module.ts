import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserV2 } from './entities/user.entity';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule.forFeature([UserV2])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
