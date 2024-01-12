/*
  Warnings:

  - You are about to drop the column `initialBidPrice` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "zipCode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Auctions" ALTER COLUMN "bidStartTime" DROP NOT NULL,
ALTER COLUMN "bidEndTime" DROP NOT NULL,
ALTER COLUMN "incrementPricePerBid" DROP NOT NULL,
ALTER COLUMN "incrementPricePerBid" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "currentBidPrice" DROP NOT NULL,
ALTER COLUMN "currentBidPrice" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "initialBidPrice",
ADD COLUMN     "price" DECIMAL(65,30);
