import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { MedicineRepository } from '../medicine.repository';
import { CreateMedicineDto } from 'src/medicine/dto/create-medicine.dto';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { Entrance } from 'src/entrance/entities/entrance.entity';
import { MedicineParamsDTO } from 'src/medicine/dto/medicine-params.dto';
import { PaginatedDto } from 'src/utils/types/dtos/paginated-response.dto';
@Injectable()
export class MedicinePrismaRepository implements MedicineRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateMedicineDto, stockId: string): Promise<Medicine> {
    const createdMedicine = await this.prisma.medicine.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        type: data.type,
        stock_id: stockId,
        qtd: data.qtd,
      },
    });
    return plainToInstance(Medicine, createdMedicine);
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.prisma.medicine.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return plainToInstance(Medicine, medicine);
  }

  async update(id: string, data: any): Promise<Medicine> {
    const updatedMedicine = await this.prisma.medicine.update({
      where: {
        id: id,
      },
      data: data,
    });
    return plainToInstance(Medicine, updatedMedicine);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.medicine.delete({
      where: {
        id: id,
      },
    });
  }

  async getEntrances(
    initalDate: string,
    finalDate: string,
  ): Promise<Entrance[]> {
    const entrances = await this.prisma.entrance.findMany({
      where: {
        createdAt: {
          gte: new Date(initalDate),
          lte: new Date(finalDate),
        },
      },
    });
    return entrances;
  }

  async findAll(params: MedicineParamsDTO): Promise<PaginatedDto> {
    let { page, perPage, name, ...searchParams } = params;
    page = params.page || 1;
    perPage = params.perPage || 5;

    const medicine = plainToInstance(
      Medicine,
      await this.prisma.medicine.findMany({
        where: {
          name: {
            contains: name,
          },
          ...searchParams,
        },
        include: {
          stock: true,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    );
    return {
      page: page,
      perPage: perPage,
      count: medicine.length,
      data: medicine,
    };
  }
}
