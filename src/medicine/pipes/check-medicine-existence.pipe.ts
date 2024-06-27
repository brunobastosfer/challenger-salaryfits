import { Injectable, PipeTransform } from '@nestjs/common';
import { MedicineService } from '../medicine.service';

@Injectable()
export class CheckMedicineExistencePipe implements PipeTransform {
  constructor(private readonly medicineService: MedicineService) {}
  async transform(value: any) {
    const medicine = await this.medicineService.findOne(value);
    return medicine;
  }
}
