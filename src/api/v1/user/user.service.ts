import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserV1 } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FindUsernameDto } from '../auth/dto/find-username.dto';
import { ResetEmailDto } from '../auth/dto/reset-email.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserV1)
    private readonly userRepository: Repository<UserV1>,
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
    this.hashPassword(createUserDto);
    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
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
      where: { username, deletedAt: IsNull() },
      select: {
        username: true,
        password: true,
        id: true,
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
