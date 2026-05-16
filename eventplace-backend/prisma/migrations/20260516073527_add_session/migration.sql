/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `SessionList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SessionList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionList" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SessionList_token_key" ON "SessionList"("token");

-- AddForeignKey
ALTER TABLE "SessionList" ADD CONSTRAINT "SessionList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
