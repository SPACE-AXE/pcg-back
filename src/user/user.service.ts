import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.birth = new Date(createUserDto.birth);
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
