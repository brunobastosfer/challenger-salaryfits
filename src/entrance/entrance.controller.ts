import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';

@ApiTags('Entradas')
@Controller('entrance')
export class EntranceController {
  constructor(private readonly entranceService: EntranceService) {}

  @ApiResponse({
    status: 200,
    description: 'Saídas encontradas com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca as entradas com o ID de Stock informado.',
  })
  @UseGuards(new RoleGuard(['admin', 'convidado']))
  @Get(':id')
  findOne(@Param('id') stockId: string) {
    return this.entranceService.findOne(stockId);
  }
}
