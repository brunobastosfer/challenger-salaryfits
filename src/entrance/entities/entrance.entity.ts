import { Stock } from 'src/stock/entities/stock.entity';

export class Entrance {
  id: string;
  stock_id: string;
  qtd: string;
  createdAt: Date;
  stock?: Stock;
}
