import { Medicine } from 'src/medicine/entities/medicine.entity';

export class PaginatedDto {
  page: number;
  perPage: number;
  count: number;
  data: Medicine[];
}
