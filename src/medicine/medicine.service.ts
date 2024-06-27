import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineRepository } from './repository/medicine.repository';
import { StockService } from 'src/stock/stock.service';
import { Medicine } from './entities/medicine.entity';
import { EntranceService } from 'src/entrance/entrance.service';
import { ExitService } from 'src/exit/exit.service';

@Injectable()
export class MedicineService {
  constructor(
    private readonly medicineRepository: MedicineRepository,
    private readonly stockService: StockService,
    private readonly entranceService: EntranceService,
    private readonly exitService: ExitService,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      const stock = await this.stockService.create();
      await this.entranceService.create(stock.id, `+${createMedicineDto.qtd}`);
      const medicine = await this.medicineRepository.create(
        createMedicineDto,
        stock.id,
      );
      return medicine;
    } catch {
      throw new BadRequestException("Can't create medicine");
    }
  }

  findAll() {
    return `This action returns all medicine`;
  }

  async findOne(id: string) {
    return await this.medicineRepository.findOne(id);
  }

  async update(medicine: Medicine, data: UpdateMedicineDto) {
    if (medicine.qtd > data.qtd) {
      await this.exitService.create(
        medicine.stock_id,
        `-${Math.abs(data.qtd - medicine.qtd)}`,
      );
    } else {
      await this.entranceService.create(
        medicine.stock_id,
        `+${Math.abs(data.qtd - medicine.qtd)}`,
      );
    }
    return await this.medicineRepository.update(medicine.id, data);
  }

  async remove(id: string) {
    return await this.medicineRepository.remove(id);
  }
}
