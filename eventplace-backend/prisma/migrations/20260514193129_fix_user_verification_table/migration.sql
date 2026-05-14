/*
  Warnings:

  - Added the required column `code` to the `user_verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `user_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_verification" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL;
