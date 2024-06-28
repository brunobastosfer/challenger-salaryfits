import { Module } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { EntranceController } from './entrance.controller';
import { EntrancePrismaRepository } from './repository/prisma/entrance.prisma.repository';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { EntranceReposity } from './repository/entrance.repository';

@Module({
  controllers: [EntranceController],
  providers: [
    EntranceService,
    PrismaService,
    { provide: EntranceReposity, useClass: EntrancePrismaRepository },
  ],
  exports: [
    { provide: EntranceReposity, useClass: EntrancePrismaRepository },
    EntranceService,
  ],
})
export class EntranceModule {}
