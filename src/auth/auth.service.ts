import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { loginDto } from './dto/credentials.dto';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(user: User) {
    const payload = { sub: user.id };

    const access_jwt = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3600s',
    });

    const refresh_jwt = jwt.sign(
      { ...payload, refresh: true },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
    return {
      access_token: access_jwt,
      refresh_token: refresh_jwt,
      data: await this.userService.findById(user.id),
    };
  }

  async validate(credentials: loginDto) {
    const user = await this.userService.findByEmail(credentials.email);
    if (!bcrypt.compareSync(credentials.password, user.password))
      throw new UnauthorizedException('credencials inválidas');

    return user;
  }
}
