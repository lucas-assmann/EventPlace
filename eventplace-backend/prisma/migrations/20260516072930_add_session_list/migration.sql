-- CreateTable
CREATE TABLE "SessionList" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionList_pkey" PRIMARY KEY ("id")
);
