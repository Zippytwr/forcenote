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
    const user = this.userRepository.create({
      id: uuidv4(),
      username: createUserDto.username,
      password: createUserDto.password
    })
    return this.userRepository.save(user, {reload: true})
  
  }
  getAll() {
    return this.userRepository.find()
  }
  findById(id: string) {
    return this.userRepository.find({ where: { id: id } })
  }
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username: username } })
    return user
  }
  async delete(id: string) {
    const user = this.userRepository.findBy({id: id})
    return this.userRepository.delete(id)
  }


}
