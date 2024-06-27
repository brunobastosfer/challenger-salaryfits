import { Exit } from '../entities/exit.entity';

export abstract class ExitRepository {
  abstract create(stock_id: string, qtd: string): Promise<Exit>;
  abstract findOne(stock_id: string): Promise<Exit>;
  abstract getExits(
    medicineId: string,
    initialDate: string,
    finalDate: string,
  ): Promise<Exit[]>;
}
