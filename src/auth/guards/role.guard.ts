import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  constructor(private readonly roles: string[]) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('token inválido ou expirado.');
    }
    if (!this.emailVerify(user.email, this.roles)) {
      throw new UnauthorizedException('permissão insuficiente.');
    }

    return user;
  }

  emailVerify(email, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (email.includes(arr[i])) {
        return true;
      }
    }
    return false;
  }
}
