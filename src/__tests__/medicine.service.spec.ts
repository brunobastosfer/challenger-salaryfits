import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from '../medicine/medicine.service';
import { StockService } from '../stock/stock.service';
import { EntranceService } from '../entrance/entrance.service';
import { ExitService } from '../exit/exit.service';
import { MedicinePrismaRepository } from '../medicine/repository/prisma/medicine.prisma.repository';

describe('MedicineService', () => {
  let service: MedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineService,
        StockService,
        EntranceService,
        ExitService,
        MedicinePrismaRepository,
      ],
    }).compile();

    service = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
