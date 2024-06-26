import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { MedicineRepository } from '../medicine.repository';
import { CreateMedicineDto } from 'src/medicine/dto/create-medicine.dto';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MedicinePrismaRepository implements MedicineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicineDto): Promise<Medicine> {
    return plainToInstance(
      Medicine,
      await this.prisma.medicine.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          type: data.type,
        },
      }),
    );
  }
}
