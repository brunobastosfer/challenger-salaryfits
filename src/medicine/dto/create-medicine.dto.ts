import { MedicineType } from '@prisma/client';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsIn(
    [
      'fitoterapico',
      'Alopatico',
      'homeopatico',
      'similar',
      'generico',
      'referencia',
      'manipulado',
    ],
    { message: 'Invalid Type' },
  )
  type: MedicineType;
}
