import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { paramsDto } from 'src/utils/types/dtos/params.dto';

export class MedicineParamsDTO extends paramsDto {
  @ApiProperty({
    example: 'Alprazolam',
    description: 'Nome do medicamento',
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Remédio utilizado para ansiedade e dormir.',
    description: 'Descrição do medicamento.',
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '12.99',
    description:
      'O preço do medicamento tem que ter ponto ao invés de vírgula.',
    required: true,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: '10',
    description:
      'A quantidade de medicamentos disponíveis no estoque. OBS: Tem que ser inteiro.',
    required: true,
  })
  @IsOptional()
  @IsNumber()
  qtd?: number;

  @ApiProperty({
    example: 'A',
    description: 'chave alfabética da resposta.',
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'fitoterapico',
    'alopatico',
    'homeopatico',
    'similar',
    'generico',
    'referencia',
    'manipulado',
  ])
  type?:
    | 'fitoterapico'
    | 'alopatico'
    | 'homeopatico'
    | 'similar'
    | 'generico'
    | 'referencia'
    | 'manipulado';
}
