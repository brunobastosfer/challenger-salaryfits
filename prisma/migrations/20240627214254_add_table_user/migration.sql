/*
  Warnings:

  - The values [Alopatico] on the enum `MedicineType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MedicineType_new" AS ENUM ('fitoterapico', 'alopatico', 'homeopatico', 'similar', 'generico', 'referencia', 'manipulado');
ALTER TABLE "Medicine" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Medicine" ALTER COLUMN "type" TYPE "MedicineType_new" USING ("type"::text::"MedicineType_new");
ALTER TYPE "MedicineType" RENAME TO "MedicineType_old";
ALTER TYPE "MedicineType_new" RENAME TO "MedicineType";
DROP TYPE "MedicineType_old";
ALTER TABLE "Medicine" ALTER COLUMN "type" SET DEFAULT 'generico';
COMMIT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
