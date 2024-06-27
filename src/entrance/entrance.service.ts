import { Injectable } from '@nestjs/common';
import { EntranceReposity } from './repository/entrance.repository';

@Injectable()
export class EntranceService {
  constructor(private readonly entranceRepository: EntranceReposity) {}
  async create(stockId: string, qtd: string) {
    return await this.entranceRepository.create(stockId, qtd);
  }

  async findOne(stockId: string) {
    return await stockId;
  }

  async getEntrances(
    medicineId: string,
    initialDate: string,
    finalDate: string,
  ) {
    return await this.entranceRepository.getEntrances(
      medicineId,
      initialDate,
      finalDate,
    );
  }

  async testQuery(medicineId: string) {
    return await this.entranceRepository.testQuery(medicineId);
  }
}
