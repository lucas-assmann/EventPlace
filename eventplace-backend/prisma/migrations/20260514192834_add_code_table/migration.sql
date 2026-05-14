-- CreateTable
CREATE TABLE "user_verification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_verification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_verification" ADD CONSTRAINT "user_verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
