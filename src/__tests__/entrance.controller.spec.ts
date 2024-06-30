import { Test, TestingModule } from '@nestjs/testing';
import { EntranceController } from '../entrance/entrance.controller';
import { EntranceService } from '../entrance/entrance.service';

describe('EntranceController', () => {
  let controller: EntranceController;
  let service: EntranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntranceController],
      providers: [
        {
          provide: EntranceService,
          useValue: {
            findOne: jest.fn().mockResolvedValue('mockedValue'),
          },
        },
      ],
    }).compile();

    controller = module.get<EntranceController>(EntranceController);
    service = module.get<EntranceService>(EntranceService);
  });

  it('should call findOne method of service with correct id', async () => {
    const stockId = 'someId';
    await controller.findOne(stockId);
    expect(service.findOne).toHaveBeenCalledWith(stockId);
  });
});
