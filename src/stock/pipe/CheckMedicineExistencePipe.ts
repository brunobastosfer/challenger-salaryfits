import { Injectable, PipeTransform } from '@nestjs/common';
import { StockService } from '../stock.service';

@Injectable()
export class CheckMedicineExistenceStockPipe implements PipeTransform {
  constructor(private readonly stockService: StockService) {}
  async transform(value: any) {
    const medicine = await this.stockService.findStockByMedicineId(value);
    return medicine.medicine.id;
  }
}
