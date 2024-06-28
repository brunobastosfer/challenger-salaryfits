import { PrismaClient } from '@prisma/client';
import { inviters } from '../../utils/local-data/inviters';
const bcrypt = require('bcryptjs');
export const adminSeed = async (prisma: PrismaClient) => {
  for (const user of inviters) {
    await prisma.user.upsert({
      where: {
        email: user,
      },
      update: {},
      create: {
        email: user,
        password: bcrypt.hashSync(process.env.INVITER_SECRET, 10),
      },
    });
  }
};
