/*
  Warnings:

  - Added the required column `stripePriceId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeAccount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "stripePriceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeAccount" TEXT NOT NULL;
