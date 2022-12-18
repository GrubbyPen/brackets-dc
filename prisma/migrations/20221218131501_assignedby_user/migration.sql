/*
  Warnings:

  - You are about to drop the column `assignedBy` on the `TeamPlayers` table. All the data in the column will be lost.
  - Added the required column `assigned_by_user_id` to the `TeamPlayers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamPlayers" DROP COLUMN "assignedBy",
ADD COLUMN     "assigned_by_user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamPlayers" ADD CONSTRAINT "TeamPlayers_assigned_by_user_id_fkey" FOREIGN KEY ("assigned_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
