import { Controller, Get, Param } from '@nestjs/common';
import { ExitService } from './exit.service';

@Controller('exit')
export class ExitController {
  constructor(private readonly exitService: ExitService) {}

  @Get(':id')
  findOne(@Param('id') stockId: string) {
    return this.exitService.findOne(stockId);
  }
}
