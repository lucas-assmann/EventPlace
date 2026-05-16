-- CreateEnum
CREATE TYPE "Status_Ticket" AS ENUM ('CANCELLED', 'PENDING', 'CONFIRMED', 'USED');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "Status_Ticket" NOT NULL DEFAULT 'PENDING';
