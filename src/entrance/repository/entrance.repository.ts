import { Entrance } from '../entities/entrance.entity';

export abstract class EntranceReposity {
  abstract create(stock_id: string, qtd: string): Promise<Entrance>;
  abstract getEntrances(
    initialDate: string,
    finalDate: string,
  ): Promise<Entrance[]>;
}
