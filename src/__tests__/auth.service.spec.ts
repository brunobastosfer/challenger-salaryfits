import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { loginDto } from '../auth/dto/credentials.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockImplementation(() => 'token'), // Corrected #2
}));

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should generate access and refresh tokens', async () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as User;
      const mockData: User = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      jest.spyOn(userService, 'findById').mockResolvedValue(mockData);

      const result = await service.login(user);

      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(result).toHaveProperty('access_token', 'token');
      expect(result).toHaveProperty('refresh_token', 'token');
      expect(result.data).toEqual(mockData);
    });
  });

  describe('validate', () => {
    it('should validate user credentials', async () => {
      const credentials: loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user: User = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as User; // Corrected #4
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(true);

      const result = await service.validate(credentials);

      expect(userService.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        credentials.password,
        user.password,
      );
      expect(result).toEqual(user);
    });
  });
});
