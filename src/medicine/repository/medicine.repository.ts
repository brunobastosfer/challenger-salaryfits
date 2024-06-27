import { Entrance } from 'src/entrance/entities/entrance.entity';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { Medicine } from '../entities/medicine.entity';

export abstract class MedicineRepository {
  abstract create(
    createMedicineDto: CreateMedicineDto,
    stockId: string,
  ): Promise<Medicine>;
  abstract findOne(id: string): Promise<Medicine>;
  abstract update(id: string, data: any): Promise<Medicine>;
  abstract remove(id: string): Promise<void>;
  abstract getEntrances(
    initalDate: string,
    finalDate: string,
  ): Promise<Entrance[]>;
}
