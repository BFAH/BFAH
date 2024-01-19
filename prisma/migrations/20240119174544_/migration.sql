/*
  Warnings:

  - Added the required column `isActive` to the `Auctions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auctions" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
