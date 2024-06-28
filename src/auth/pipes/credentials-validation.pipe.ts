import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

import { loginDto } from '../dto/credentials.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class credentialsValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: loginDto) {
    let user;
    try {
      user = await this.userService.findByEmail(value.email);
    } catch {
      throw new UnauthorizedException('credenciais inválidas.');
    }

    if (user.role !== 'supporter' && !value.password)
      throw new UnauthorizedException('senha obrigatória!');

    value.user = user;
    return value;
  }
}
