/*
  Warnings:

  - You are about to drop the `User_localization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_localization" DROP CONSTRAINT "User_localization_userId_fkey";

-- DropTable
DROP TABLE "User_localization";

-- CreateTable
CREATE TABLE "user_localization" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,

    CONSTRAINT "user_localization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_localization" ADD CONSTRAINT "user_localization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
