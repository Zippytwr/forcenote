import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("login")
  async signIn(@Res({ passthrough: true }) res: Response, @Body() { username, password }: { username: string, password: string }) {
    const { access_token } = await this.authService.signIn(username, password)
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, // только по HTTPS
      sameSite: 'strict', // защита от CSRF
      maxAge: 1000 * 60 * 15, // например, 15 минут
    });
    return { message: 'Login successful' };
  }
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.authService.registration(createUserDto);
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // или твой кастомный
  async getProfile(@Req() req: Request) {
    const userId = (req.user as any).id;

    const user = await this.authService.getProfile(userId)
    return user;
  }
  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax', // как у login
      secure: false,   // как у login
    });
    return { message: 'Logout successful' };
  }
}
