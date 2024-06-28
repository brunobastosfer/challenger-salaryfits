import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Stock } from '../entities/stock.entity';
import { UpdateMedicineDto } from 'src/medicine/dto/update-medicine.dto';

export abstract class StockRepository {
  abstract create(): Promise<Stock>;
  abstract update(medicine: Medicine, data: UpdateMedicineDto): Promise<Stock>;
  abstract findStockByMedicineId(id: string): Promise<Stock>;
  abstract findStockByDates(
    startDate: string,
    endDate: string,
  ): Promise<Stock[]>;
}
