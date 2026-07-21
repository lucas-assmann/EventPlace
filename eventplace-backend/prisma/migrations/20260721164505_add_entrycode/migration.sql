/*
  Warnings:

  - You are about to drop the `BlackList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entryCode]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryCode` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntryStatus" AS ENUM ('ENTERED', 'NOT_ENTERED');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "entryCode" TEXT NOT NULL,
ADD COLUMN     "entryStatus" "EntryStatus" NOT NULL DEFAULT 'NOT_ENTERED';

-- DropTable
DROP TABLE "BlackList";

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_entryCode_key" ON "Ticket"("entryCode");
