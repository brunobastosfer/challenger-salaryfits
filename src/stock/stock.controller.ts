import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { StockService } from './stock.service';
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

  @Get('medicine/report-pdf')
  async getPdf(
    @Query('initialDate') initialDate: string,
    @Query('finalDate') finalDate: string,
    @Res() res: Response,
  ) {
    const pdfData = await this.stockService.generatePDF(initialDate, finalDate);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.send(pdfData);
  }
}
