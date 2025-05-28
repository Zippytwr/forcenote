import { Injectable, UnauthorizedException } from '@nestjs/common';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);
    if (!user || !user.password) {
      throw new UnauthorizedException('User not found or password missing');
    }
    
    const pepperedPass = pass + process.env.PEPPER;
    const isMatch = await compare(pepperedPass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.username };
    const jwtPayload = await this.jwtService.signAsync(payload)

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
  registration(createUserDto: CreateUserDto) {
    this.userService.create(createUserDto)
  }

}


