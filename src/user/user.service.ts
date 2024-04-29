import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FindUsernameDto } from 'src/auth/dto/find-username.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOneByNameAndEmail(body: FindUsernameDto) {
    const user = await this.userRepository.findOne({
      where: { name: body.name, email: body.email },
      select: {
        username: true,
      },
    });

    if (user) return user;
    else throw new ConflictException('User not found');
  }

  async findOneByUserNameAndEmail(body: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { username: body.username, email: body.email },
    });

    if (user) return user;
    else throw new ConflictException('User not found');
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.birth = new Date(createUserDto.birth);
    this.hashPassword(createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  hashPassword(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(+this.configService.get('JWT_SECRET'));
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async findOne(user: User) {
    return await this.userRepository.findOne({ where: { id: user.id } });
  }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
