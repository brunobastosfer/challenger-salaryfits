import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { loginDto } from '../auth/dto/credentials.dto';
import { RefreshJwtGuard } from '../auth/guards/refresh.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validate: jest
              .fn()
              .mockResolvedValue({ userId: 1, username: 'testUser' }),
            login: jest.fn().mockResolvedValue('mockedToken'),
          },
        },
      ],
    })
      .overrideGuard(RefreshJwtGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const credentials: loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(await controller.login(credentials)).toBe('mockedToken');
      expect(authService.validate).toHaveBeenCalledWith(credentials);
      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should refresh token', async () => {
      const req = { user: { userId: 1, username: 'testUser' } };
      expect(await controller.refresh(req as any)).toBe('mockedToken');
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });
});
