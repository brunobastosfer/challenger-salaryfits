import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserPrismaRepository } from '../repository/prisma/users.repository.prisma';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserPrismaRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
