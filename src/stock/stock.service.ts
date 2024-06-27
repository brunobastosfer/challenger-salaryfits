import { Injectable } from '@nestjs/common';
import { StockRepository } from './repository/stock.repository';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { UpdateMedicineDto } from 'src/medicine/dto/update-medicine.dto';
import { EntranceService } from 'src/entrance/entrance.service';
import { ExitService } from 'src/exit/exit.service';
import * as PDFDocument from 'pdfkit';
import axios from 'axios';

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly entranceService: EntranceService,
    private readonly exitService: ExitService,
  ) {}
  async create() {
    return await this.stockRepository.create();
  }

  findAll() {
    return `This action returns all stock`;
  }

  async findStockByMedicineId(id: string) {
    return await this.stockRepository.findStockByMedicineId(id);
  }

  async update(medicine: Medicine, data: UpdateMedicineDto) {
    return await this.stockRepository.update(medicine, data);
  }

  async generatePDF(
    medicineId: string,
    initialDate: string,
    finalDate: string,
  ) {
    const entrance = await this.entranceService.getEntrances(
      medicineId,
      initialDate,
      finalDate,
    );

    const exits = await this.exitService.getExits(
      medicineId,
      initialDate,
      finalDate,
    );

    console.log(exits);

    const medicine =
      await this.stockRepository.findStockByMedicineId(medicineId);

    const imageUrl =
      'https://cdn.prod.website-files.com/604f6dd6484918ba61b90055/660c3ae38c4e84e1e8e4faad_LOGO.png';
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.image(imageBuffer, 50, 50, {
      fit: [250, 300],
    });

    doc.moveDown(5);

    doc.fontSize(20).text('Entradas', { underline: true });
    entrance.forEach((enter) => {
      doc
        .fontSize(12)
        .text(
          `Medicamento: ${medicine.medicine.name}, Valor: ${medicine.medicine.price}, QTD: ${enter.qtd}, DATA: ${enter.createdAt}`,
        );
    });
    doc.addPage().fontSize(20).text('Saídas', { underline: true });
    exits.forEach((exit) => {
      doc
        .fontSize(12)
        .text(
          `Medicamento: ${medicine.medicine.name}, Valor: ${medicine.medicine.price}, QTD: ${exit.qtd}, DATA: ${exit.createdAt}`,
        );
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
    });
  }
}
