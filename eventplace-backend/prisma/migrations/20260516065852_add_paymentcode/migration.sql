/*
  Warnings:

  - A unique constraint covering the columns `[paymentCode]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "paymentCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_paymentCode_key" ON "Ticket"("paymentCode");
