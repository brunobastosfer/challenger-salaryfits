import { Module } from '@nestjs/common';
import { ExitService } from './exit.service';
import { ExitController } from './exit.controller';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { ExitRepository } from './repository/exit.repository';
import { ExitPrismaRepository } from './repository/prisma/exit.prisma.repository';

@Module({
  controllers: [ExitController],
  providers: [
    ExitService,
    PrismaService,
    { provide: ExitRepository, useClass: ExitPrismaRepository },
  ],
  exports: [ExitService],
})
export class ExitModule {}
