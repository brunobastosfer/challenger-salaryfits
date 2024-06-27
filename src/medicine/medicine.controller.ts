import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { CheckMedicineExistencePipe } from './pipes/check-medicine-existence.pipe';
import { Medicine } from './entities/medicine.entity';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(id);
  }

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
