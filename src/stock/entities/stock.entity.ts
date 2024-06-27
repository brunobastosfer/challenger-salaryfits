import { Entrance } from 'src/entrance/entities/entrance.entity';
import { Exit } from 'src/exit/entities/exit.entity';
import { Medicine } from 'src/medicine/entities/medicine.entity';

export class Stock {
  id: string;
  medicine?: Medicine;
  entrance?: Entrance[];
  exit?: Exit[];
}
