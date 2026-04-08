-- CreateTable
CREATE TABLE "Localization" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
