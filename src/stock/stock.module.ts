import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { StockRepository } from './repository/stock.repository';
import { StockPrismaRepository } from './repository/prisma/stock.prisma.repository';
import { EntranceModule } from 'src/entrance/entrance.module';
import { ExitModule } from 'src/exit/exit.module';

@Module({
  controllers: [StockController],
  imports: [EntranceModule, ExitModule],
  providers: [
    StockService,
    PrismaService,
    { provide: StockRepository, useClass: StockPrismaRepository },
  ],
  exports: [
    {
      provide: StockRepository,
      useClass: StockPrismaRepository,
    },
    StockService,
  ],
})
export class StockModule {}
