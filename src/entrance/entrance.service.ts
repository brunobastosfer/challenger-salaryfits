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

  async getEntrances(initialDate: string, finalDate: string) {
    return await this.entranceRepository.getEntrances(initialDate, finalDate);
  }
}
