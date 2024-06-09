import { Park as ParkEntity } from 'src/api/v2/park/entities/park.entity';
import { User as UserEntity } from 'src/api/v2/user/entities/user.entity';
declare global {
  namespace Express {
    export interface User extends UserEntity {}
    export interface Request {
      park?: ParkEntity;
    }
  }
}
