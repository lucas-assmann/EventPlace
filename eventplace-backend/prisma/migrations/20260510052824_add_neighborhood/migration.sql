/*
  Warnings:

  - You are about to drop the column `number` on the `Event` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `event_localization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `user_localization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "number";

-- AlterTable
ALTER TABLE "event_localization" ADD COLUMN     "neighborhood" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_localization" ADD COLUMN     "neighborhood" TEXT NOT NULL;
