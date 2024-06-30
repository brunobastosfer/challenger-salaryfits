import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from '../medicine/medicine.controller';
import { MedicineService } from '../medicine/medicine.service';
import { CreateMedicineDto } from '../medicine/dto/create-medicine.dto';

describe('MedicineController', () => {
  let controller: MedicineController;
  let service: MedicineService;

  const mockMedicineService = {
    createMedicine: jest.fn(dto => {
      return {
        id: Date.now();
        ...dto,
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineController],
      providers: [
        {
          provide: MedicineService,
          useValue: mockMedicineService,
        }
      ],
    }).compile();

    controller = module.get<MedicineController>(MedicineController);
    service = module.get<MedicineService>(MedicineService);
  });

  it('should create a medicine', async () => {
    const dto : CreateMedicineDto = {
          name: 'Paracetamol',
          description: 'Pain reliever',
          price: 5.0,
          type: 'similar',
          qtd: 100
    };

    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    });

    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
