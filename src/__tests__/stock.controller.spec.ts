import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from '../stock.controller';
import { StockService } from '../stock.service';
import { EntranceService } from '../../entrance/entrance.service';
import { ExitService } from '../../exit/exit.service';

describe('StockController', () => {
  let controller: StockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService, EntranceService, ExitService],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
