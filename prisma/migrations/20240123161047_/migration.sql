-- DropIndex
DROP INDEX "Account_id_key";

-- AlterTable
ALTER TABLE "Account" ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");
