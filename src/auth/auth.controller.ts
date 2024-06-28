import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { credentialsValidationPipe } from './pipes/credentials-validation.pipe';
import { loginDto } from './dto/credentials.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'O usuário logou com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas para usuário encontrado.',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 400, description: 'email inválido informado.' })
  @ApiBody({
    type: loginDto,
    description: 'Json com credenciais de usuário',
  })
  @ApiOperation({ summary: 'loga usuário na plataforma.' })
  async login(@Body(credentialsValidationPipe) credentials: loginDto) {
    credentials;
    const user = await this.authService.validate(credentials);
    return this.authService.login(user);
  }

  @ApiResponse({
    status: 200,
    description: 'O access token foi renovado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'refresh token inválido ou inexistente.',
  })
  @ApiHeader({
    name: 'bearer',
    description: 'refresh token fornecido no ato de login do usuário',
  })
  @ApiOperation({ summary: 'renova o token de acesso expirado do usuário.' })
  @UseGuards(RefreshJwtGuard)
  @Post('refresh-jwt')
  async refresh(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }
}
