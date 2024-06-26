import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { MedicineRepository } from './repository/medicine.repository';
import { MedicinePrismaRepository } from './repository/prisma/medicine.prisma.repository';

@Module({
  controllers: [MedicineController],
  providers: [
    MedicineService,
    PrismaService,
    { provide: MedicineRepository, useClass: MedicinePrismaRepository },
  ],
})
export class MedicineModule {}
