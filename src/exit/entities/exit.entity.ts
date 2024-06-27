import { Stock } from 'src/stock/entities/stock.entity';

export class Exit {
  id: string;
  qtd: string;
  stock_id: string;
  createdAt: Date;
  stock?: Stock;
}
