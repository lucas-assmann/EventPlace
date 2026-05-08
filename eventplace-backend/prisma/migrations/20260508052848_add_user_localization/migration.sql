-- CreateTable
CREATE TABLE "User_localization" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,

    CONSTRAINT "User_localization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_localization" ADD CONSTRAINT "User_localization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
