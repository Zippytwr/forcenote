import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  signIn(@Body() {username, password}: {username: string, password: string}) {
    return this.authService.signIn(username, password)
  }
  @Post("")
  register(
    @Body() createUserDto: CreateUserDto
  ) {
    this.authService.registration(createUserDto)
  }
}
