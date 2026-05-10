/*
  Warnings:

  - Added the required column `appropriate_age` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banner` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_person_quantity` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "appropriate_age" AS ENUM ('ADULT', 'EVERYONE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "appropriate_age" "appropriate_age" NOT NULL,
ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "max_person_quantity" INTEGER NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "event_localization" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_localization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_localization" ADD CONSTRAINT "event_localization_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
