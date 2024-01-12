/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `initialBidPrice` on the `Products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryId_fkey";

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
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("productId");

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoryId",
DROP COLUMN "initialBidPrice",
ADD COLUMN     "price" DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
