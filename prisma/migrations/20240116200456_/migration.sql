/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE account_id_seq;
ALTER TABLE "Account" ALTER COLUMN "id" SET DEFAULT nextval('account_id_seq');
ALTER SEQUENCE account_id_seq OWNED BY "Account"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
