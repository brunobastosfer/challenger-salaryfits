import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({ where: { email } });
  }
  async findById(id: string): Promise<User> {
    return plainToInstance(
      User,
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      }),
    );
  }

  async findByUniqueEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
