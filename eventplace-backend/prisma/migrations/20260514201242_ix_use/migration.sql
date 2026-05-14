/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `user_verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_verification_code_key" ON "user_verification"("code");
