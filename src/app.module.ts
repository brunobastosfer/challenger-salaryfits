import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './medicine/medicine.module';
import { ConfigModule } from '@nestjs/config';
import { StockModule } from './stock/stock.module';
import { EntranceModule } from './entrance/entrance.module';
import { ExitModule } from './exit/exit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MedicineModule,
    StockModule,
    EntranceModule,
    ExitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
