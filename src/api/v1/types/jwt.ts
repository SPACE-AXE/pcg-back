import { User as UserDto } from 'src/api/v1/user/entities/user.entity';

declare global {
  namespace Express {
    export interface User extends UserDto {}
  }
}
