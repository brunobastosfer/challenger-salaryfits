import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ExitService } from './exit.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';

@ApiTags('Saídas')
@Controller('exit')
export class ExitController {
  constructor(private readonly exitService: ExitService) {}

  @ApiResponse({
    status: 200,
    description: 'Saídas encontradas com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca as saídas com o ID de Stock informado.',
  })
  @UseGuards(new RoleGuard(['admin', 'convidado']))
  @Get(':id')
  findOne(@Param('id') stockId: string) {
    return this.exitService.findOne(stockId);
  }
}
