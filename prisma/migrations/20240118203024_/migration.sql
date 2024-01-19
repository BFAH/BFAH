/*
  Warnings:

  - You are about to drop the column `incrementPricePerBid` on the `Auctions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "incrementPricePerBid";
