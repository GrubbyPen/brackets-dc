/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `TeamPlayers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamPlayers" DROP COLUMN "assignedAt",
ADD COLUMN     "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
