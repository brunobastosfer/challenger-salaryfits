import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { CheckMedicineExistencePipe } from './pipes/check-medicine-existence.pipe';
import { Medicine } from './entities/medicine.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { MedicineParamsDTO } from './dto/medicine-params.dto';

@ApiTags('Medicamentos')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @ApiResponse({ status: 201, description: 'post criado com sucesso.' })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiResponse({
    status: 400,
    description: 'dados de criação de post inválidos.',
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cria um medicamento.',
  })
  @UseGuards(new RoleGuard(['admin']))
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @ApiResponse({
    status: 200,
    description: 'medicamentos buscados com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiResponse({
    status: 400,
    description: 'dados dos parametros de filtragem inválidos.',
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Busca todos os medicamentos cadastrados com possibilidade de filtro.',
  })
  @UseGuards(new RoleGuard(['admin', 'convidado']))
  @Get()
  findAll(@Query() params: MedicineParamsDTO) {
    params.page = Number(params.page);
    params.perPage = Number(params.perPage);
    return this.medicineService.findAll(params);
  }

  @ApiResponse({ status: 200, description: 'medicamento buscado com sucesso.' })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiResponse({
    status: 400,
    description: 'Não há um medicamento com este ID.',
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca o medicamento com o ID informado.',
  })
  @UseGuards(new RoleGuard(['admin', 'convidado']))
  @Get(':id')
  findOne(@Param('id', CheckMedicineExistencePipe) medicine: Medicine) {
    return this.medicineService.findOne(medicine.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Medicamento atualizado com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'permissão insuficiente.' })
  @ApiResponse({
    status: 400,
    description: 'Não há um medicamento com este ID.',
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza o medicamento com o ID informado.',
  })
  @UseGuards(new RoleGuard(['admin']))
  @Patch(':id')
  update(
    @Param('id', CheckMedicineExistencePipe) medicine: Medicine,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.update(medicine, updateMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id', CheckMedicineExistencePipe) medicine: Medicine) {
    return this.medicineService.remove(medicine.id);
  }
}
