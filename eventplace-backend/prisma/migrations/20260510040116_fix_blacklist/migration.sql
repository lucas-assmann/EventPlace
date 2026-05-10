-- DropForeignKey
ALTER TABLE "BlackList" DROP CONSTRAINT "BlackList_userId_fkey";

-- AddForeignKey
ALTER TABLE "BlackList" ADD CONSTRAINT "BlackList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
