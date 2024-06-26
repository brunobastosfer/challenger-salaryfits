import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { Medicine } from '../entities/medicine.entity';

export abstract class MedicineRepository {
  abstract create(createMedicineDto: CreateMedicineDto): Promise<Medicine>;
}
