import { Entrance } from 'src/entrance/entities/entrance.entity';
import { EntranceReposity } from '../entrance.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma-service/prisma.service';

@Injectable()
export class EntrancePrismaRepository implements EntranceReposity {
  constructor(private readonly prisma: PrismaService) {}
  async create(stock_id: string, qtd: string): Promise<Entrance> {
    return await this.prisma.entrance.create({
      data: {
        stock_id,
        qtd,
      },
    });
  }
  async getEntrances(
    medicineId: string,
    initialDate: string,
    finalDate: string,
  ): Promise<Entrance[]> {
    return await this.prisma.entrance.findMany({
      where: {
        stock: {
          medicine: {
            id: medicineId,
          },
        },
        AND: {
          createdAt: {
            gte: new Date(initialDate),
            lte: new Date(finalDate),
          },
        },
      },
    });
  }

  async testQuery(medicineId: string) {
    return await this.prisma.entrance.findMany({
      where: {
        stock: {
          medicine: {
            id: medicineId,
          },
        },
      },
    });
  }
}
