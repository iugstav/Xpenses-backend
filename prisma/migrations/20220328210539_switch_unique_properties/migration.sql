/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `expenses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "expenses_name_key" ON "expenses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_name_key" ON "wallets"("name");
