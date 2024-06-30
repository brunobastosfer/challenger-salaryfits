import { Test, TestingModule } from '@nestjs/testing';
import { ExitService } from '../exit/exit.service';
import { ExitPrismaRepository } from '../exit/repository/prisma/exit.prisma.repository';

describe('ExitService', () => {
  let service: ExitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExitService, ExitPrismaRepository],
    }).compile();

    service = module.get<ExitService>(ExitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
