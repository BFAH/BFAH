/*
  Warnings:

  - You are about to drop the `UserAuctions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAuctions" DROP CONSTRAINT "UserAuctions_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "UserAuctions" DROP CONSTRAINT "UserAuctions_userId_fkey";

-- AlterTable
ALTER TABLE "Auctions" ADD COLUMN     "currentBidUserId" INTEGER;

-- DropTable
DROP TABLE "UserAuctions";
