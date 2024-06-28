import { IsString } from 'class-validator';

export class StockParams {
  @IsString()
  initialDate: string;
  @IsString()
  finalDate: string;
}
