/*
  Warnings:

  - You are about to drop the column `userId` on the `BlackList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlackList" DROP CONSTRAINT "BlackList_userId_fkey";

-- AlterTable
ALTER TABLE "BlackList" DROP COLUMN "userId";
