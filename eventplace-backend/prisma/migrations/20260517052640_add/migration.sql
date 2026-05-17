/*
  Warnings:

  - The values [TEEN,CHILD] on the enum `User_age` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "User_age_new" AS ENUM ('ADULT', 'MINOR');
ALTER TABLE "User" ALTER COLUMN "age" TYPE "User_age_new" USING ("age"::text::"User_age_new");
ALTER TYPE "User_age" RENAME TO "User_age_old";
ALTER TYPE "User_age_new" RENAME TO "User_age";
DROP TYPE "public"."User_age_old";
COMMIT;
