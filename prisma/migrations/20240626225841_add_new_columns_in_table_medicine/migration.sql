/*
  Warnings:

  - Added the required column `description` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
