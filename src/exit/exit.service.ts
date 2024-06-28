import { Injectable } from '@nestjs/common';
import { ExitRepository } from './repository/exit.repository';
import { Exit } from './entities/exit.entity';

@Injectable()
export class ExitService {
  constructor(private readonly exitRepository: ExitRepository) {}
  async create(stockId: string, qtd: string): Promise<Exit> {
    return await this.exitRepository.create(stockId, qtd);
  }

  async findOne(stockId: string) {
    return await this.exitRepository.findOne(stockId);
  }

  async getExits(medicineId: string, initialDate: string, finalDate: string) {
    return await this.exitRepository.getExits(
      medicineId,
      initialDate,
      finalDate,
    );
  }
}
