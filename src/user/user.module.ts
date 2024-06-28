import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { UserRepository } from './repository/users.repository';
import { UserPrismaRepository } from './repository/prisma/users.repository.prisma';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
  exports: [
    UserService,
    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
})
export class UserModule {}
