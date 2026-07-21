-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('WILL_HAPPEN', 'ONGOING', 'FINISHED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'WILL_HAPPEN';
