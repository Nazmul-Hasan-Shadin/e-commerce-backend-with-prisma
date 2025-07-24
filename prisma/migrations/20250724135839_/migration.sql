/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `ProductView` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductView_productId_userId_key" ON "ProductView"("productId", "userId");
