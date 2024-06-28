import { Controller, Get, Param } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entradas')
@Controller('entrance')
export class EntranceController {
  constructor(private readonly entranceService: EntranceService) {}

  @Get(':id')
  findOne(@Param('id') stockId: string) {
    return this.entranceService.findOne(stockId);
  }
}
