import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.birth = new Date(createUserDto.birth);
    const salt = bcrypt.genSaltSync(+this.configService.get('JWT_SECRET'));
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
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
