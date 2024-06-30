import { Test, TestingModule } from '@nestjs/testing';
import { ExitController } from '../exit/exit.controller';
import { ExitService } from '../exit/exit.service';
import { ExitPrismaRepository } from '../exit/repository/prisma/exit.prisma.repository';

describe('ExitController', () => {
  let controller: ExitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExitController],
      providers: [ExitService, ExitPrismaRepository],
    }).compile();

    controller = module.get<ExitController>(ExitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
