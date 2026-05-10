/*
  Warnings:

  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `appropriate_age` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Appropriate_age" AS ENUM ('ADULT', 'EVERYONE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "appropriate_age",
ADD COLUMN     "appropriate_age" "Appropriate_age" NOT NULL;

-- DropEnum
DROP TYPE "appropriate_age";
