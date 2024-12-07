/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "logoUrl",
ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
