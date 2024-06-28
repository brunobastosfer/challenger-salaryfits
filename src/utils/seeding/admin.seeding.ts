import { PrismaClient } from '@prisma/client';
import { admins } from '../../utils/local-data/admins';
const bcrypt = require('bcryptjs');
export const adminSeed = async (prisma: PrismaClient) => {
  for (const user of admins) {
    await prisma.user.upsert({
      where: {
        email: user,
      },
      update: {},
      create: {
        email: user,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      },
    });
  }
};
