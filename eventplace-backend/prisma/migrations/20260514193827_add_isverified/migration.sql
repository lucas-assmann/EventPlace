/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user_verification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user_verification" DROP COLUMN "isVerified";
