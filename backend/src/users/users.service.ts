import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      id: uuidv4(),
      username: createUserDto.username,
      password: createUserDto.password
    })
  }
  getAll(updateUserDto: UpdateUserDto) {
    return this.userRepository.find()
  }
  findById(id: string) {
    return this.userRepository.find({where: {id: id}})
  }
}
