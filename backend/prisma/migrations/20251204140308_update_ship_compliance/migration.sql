/*
  Warnings:

  - You are about to drop the column `cbGco2eq` on the `ShipCompliance` table. All the data in the column will be lost.
  - Added the required column `cbValue` to the `ShipCompliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShipCompliance" DROP COLUMN "cbGco2eq",
ADD COLUMN     "cbValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
