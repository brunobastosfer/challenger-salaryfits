/*
  Warnings:

  - Added the required column `qtd` to the `Entrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd` to the `Exit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrance" ADD COLUMN     "qtd" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Exit" ADD COLUMN     "qtd" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "qtd" INTEGER NOT NULL DEFAULT 0;
