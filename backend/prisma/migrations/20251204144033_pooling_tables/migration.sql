/*
  Warnings:

  - You are about to drop the column `cbAfter` on the `PoolMember` table. All the data in the column will be lost.
  - You are about to drop the column `cbBefore` on the `PoolMember` table. All the data in the column will be lost.
  - Added the required column `cb_after` to the `PoolMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cb_before` to the `PoolMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PoolMember" DROP COLUMN "cbAfter",
DROP COLUMN "cbBefore",
ADD COLUMN     "cb_after" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cb_before" DOUBLE PRECISION NOT NULL;
