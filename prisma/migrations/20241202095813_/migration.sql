/*
  Warnings:

  - The primary key for the `ShopFollower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ShopFollower` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,shopId]` on the table `ShopFollower` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ShopFollower" DROP CONSTRAINT "ShopFollower_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "ShopFollower_userId_shopId_key" ON "ShopFollower"("userId", "shopId");
