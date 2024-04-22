import { User as UserDto } from 'src/user/entities/user.entity';

declare global {
  namespace Express {
    export interface User extends UserDto {}
  }
}
