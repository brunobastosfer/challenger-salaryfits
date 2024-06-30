import { Test, TestingModule } from '@nestjs/testing';
import { EntranceService } from '../entrance/entrance.service';
import { EntranceReposity } from '../entrance/repository/entrance.repository';

describe('EntranceService', () => {
  let service: EntranceService;
  let repository: EntranceReposity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntranceService,
        {
          provide: EntranceReposity,
          useValue: {
            create: jest.fn(),
            getEntrances: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EntranceService>(EntranceService);
    repository = module.get<EntranceReposity>(EntranceReposity);
  });

  it('should call create method of repository with correct parameters', async () => {
    const stockId = 'stockId';
    const qtd = '10';
    await service.create(stockId, qtd);
    expect(repository.create).toHaveBeenCalledWith(stockId, qtd);
  });

  it('should return the passed stockId from findOne method', async () => {
    const stockId = 'stockId';
    const result = await service.findOne(stockId);
    expect(result).toBe(stockId);
  });

  it('should call getEntrances method of repository with correct parameters', async () => {
    const medicineId = 'medicineId';
    const initialDate = '2021-01-01';
    const finalDate = '2021-01-31';
    await service.getEntrances(medicineId, initialDate, finalDate);
    expect(repository.getEntrances).toHaveBeenCalledWith(
      medicineId,
      initialDate,
      finalDate,
    );
  });
});
