import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma-service/prisma.service';
import { Exit } from 'src/exit/entities/exit.entity';

@Injectable()
export class ExitPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(stockId: string, qtd: string): Promise<Exit> {
    return await this.prisma.exit.create({
      data: {
        qtd,
        stock: {
          connect: {
            id: stockId,
          },
        },
      },
    });
  }

  async findOne(stockId: string): Promise<Exit> {
    return await this.prisma.exit.findFirst({
      where: {
        stock_id: stockId,
      },
    });
  }

  async getExits(
    medicineId: string,
    initialDate: string,
    finalDate: string,
  ): Promise<any> {
    return await this.prisma.exit.findMany({
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
}
