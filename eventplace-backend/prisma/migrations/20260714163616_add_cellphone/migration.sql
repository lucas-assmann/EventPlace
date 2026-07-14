/*
  Warnings:

  - A unique constraint covering the columns `[cellphone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cellphone` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cellphone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "cellphone" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cellphone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_cellphone_key" ON "User"("cellphone");
