import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from '../stock.service';
import { EntranceService } from '../../entrance/entrance.service';
import { ExitService } from '../../exit/exit.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockService, EntranceService, ExitService],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
