/*
  Warnings:

  - You are about to drop the column `teamSize` on the `Tournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "teamSize",
ADD COLUMN     "team_size" INTEGER NOT NULL DEFAULT 1;
