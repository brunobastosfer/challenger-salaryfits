import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { StockService } from './stock.service';
import { CheckMedicineExistenceStockPipe } from './pipe/CheckMedicineExistencePipe';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estoque')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findStockByMedicineId(id);
  }

  @Get('medicine/:id/report-pdf')
  async getPdf(
    @Param('id', CheckMedicineExistenceStockPipe) id: string,
    @Query('initialDate') initialDate: string,
    @Query('finalDate') finalDate: string,
    @Res() res: Response,
  ) {
    const pdfData = await this.stockService.generatePDF(
      id,
      initialDate,
      finalDate,
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.send(pdfData);
  }
}
