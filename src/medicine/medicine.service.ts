import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineRepository } from './repository/medicine.repository';

@Injectable()
export class MedicineService {
  constructor(private readonly medicineRepository: MedicineRepository) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      const medicine = await this.medicineRepository.create(createMedicineDto);
      return medicine;
    } catch (error) {
      throw new BadRequestException("Can't create medicine");
    }
  }

  findAll() {
    return `This action returns all medicine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicine`;
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
