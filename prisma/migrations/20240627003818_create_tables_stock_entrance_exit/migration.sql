/*
  Warnings:

  - A unique constraint covering the columns `[stock_id]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stock_id` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "stock_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "Entrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "Exit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Entrance_id_key" ON "Entrance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Entrance_stock_id_key" ON "Entrance"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "Exit_id_key" ON "Exit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exit_stock_id_key" ON "Exit"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_stock_id_key" ON "Medicine"("stock_id");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrance" ADD CONSTRAINT "Entrance_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
