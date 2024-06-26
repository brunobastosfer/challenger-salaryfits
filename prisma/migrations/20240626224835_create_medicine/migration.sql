-- CreateEnum
CREATE TYPE "MedicineType" AS ENUM ('fitoterapico', 'Alopatico', 'homeopatico', 'similar', 'generico', 'referencia', 'manipulado');

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MedicineType" NOT NULL DEFAULT 'generico',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_id_key" ON "Medicine"("id");
