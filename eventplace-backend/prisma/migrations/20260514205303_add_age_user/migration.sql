/*
  Warnings:

  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "User_age" AS ENUM ('ADULT', 'TEEN', 'CHILD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" "User_age" NOT NULL;
