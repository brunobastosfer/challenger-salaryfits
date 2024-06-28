import { Injectable } from '@nestjs/common';
import { StockRepository } from '../stock.repository';
import { Stock } from 'src/stock/entities/stock.entity';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StockPrismaRepository implements StockRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(): Promise<Stock> {
    return await this.prisma.stock.create({
      data: {},
    });
  }

  async update(medicine: Medicine, data: any): Promise<Stock> {
    return await this.prisma.stock.update({
      where: { id: medicine.id },
      data,
    });
  }

  async findStockByDates(startDate: string, endDate: string): Promise<Stock[]> {
    return plainToInstance(
      Stock,
      await this.prisma.stock.findMany({
        where: {
          OR: [
            {
              createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            },
            {
              updatedAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            },
          ],
        },
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              type: true,
              qtd: true,
            },
          },
          entrance: {
            select: {
              id: true,
              qtd: true,
              createdAt: true,
            },
          },
          exit: {
            select: {
              id: true,
              qtd: true,
              createdAt: true,
            },
          },
        },
      }),
    );
  }

  async findStockByMedicineId(id: string): Promise<Stock> {
    return plainToInstance(
      Stock,
      await this.prisma.stock.findFirstOrThrow({
        where: {
          medicine: {
            id,
          },
        },
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              type: true,
              qtd: true,
            },
          },
          entrance: {
            select: {
              id: true,
              qtd: true,
              createdAt: true,
            },
          },
          exit: {
            select: {
              id: true,
              qtd: true,
              createdAt: true,
            },
          },
        },
      }),
    );
  }
}
