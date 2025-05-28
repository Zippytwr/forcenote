// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Извлекаем токен из cookie
        (req) => {
          return req?.cookies?.access_token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: String(process.env.SECRET), // Используй переменную окружения
    });
  }

  async validate(payload: any) {
    // payload — это декодированный токен
    return { id: payload.sub, username: payload.username };
  }
}
