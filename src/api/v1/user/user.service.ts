import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FindUsernameDto } from 'src/api/v1/auth/dto/find-username.dto';
import { ResetEmailDto } from 'src/api/v1/auth/dto/reset-email.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOneByNameAndEmail(findUsernameDto: FindUsernameDto) {
    const user = await this.userRepository.findOne({
      where: { name: findUsernameDto.name, email: findUsernameDto.email },
      select: {
        username: true,
      },
    });

    if (user) return user;
    else throw new NotFoundException('User not found');
  }

  async findOneByUserNameAndEmail(resetEmailDto: ResetEmailDto) {
    const user = await this.userRepository.findOne({
      where: { username: resetEmailDto.username, email: resetEmailDto.email },
    });

    if (user) return user;
    else throw new NotFoundException('User not found');
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.birth = new Date(createUserDto.birth);
    this.hashPassword(createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.insert(newUser);
  }

  hashPassword(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(+this.configService.get('JWT_SECRET'));
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      select: {
        username: true,
        password: true,
        id: true,
        birth: true,
        email: true,
        name: true,
        createdAt: true,
        deletedAt: true,
        nickname: true,
      },
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
