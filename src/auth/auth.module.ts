import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repository/users.repository';
import { UserPrismaRepository } from 'src/user/repository/prisma/users.repository.prisma';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserService,
    { provide: UserRepository, useClass: UserPrismaRepository },
    PrismaService,
    JwtStrategy,
  ],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
