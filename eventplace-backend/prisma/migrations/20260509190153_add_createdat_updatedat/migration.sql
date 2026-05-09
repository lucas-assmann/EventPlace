/*
  Warnings:

  - Added the required column `updatedAt` to the `user_localization` table without a default value. This is not possible if the table is not empty.
  - Made the column `number` on table `user_localization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rating" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "user_localization" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "number" SET NOT NULL;
