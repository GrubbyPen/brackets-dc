/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentId` on the `Team` table. All the data in the column will be lost.
  - The primary key for the `TeamPlayers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `TeamPlayers` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `TeamPlayers` table. All the data in the column will be lost.
  - Added the required column `tournament_id` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournament_id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `TeamPlayers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `TeamPlayers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "TeamPlayers" DROP CONSTRAINT "TeamPlayers_playerId_fkey";

-- DropForeignKey
ALTER TABLE "TeamPlayers" DROP CONSTRAINT "TeamPlayers_teamId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "tournamentId",
ADD COLUMN     "tournament_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "tournamentId",
ADD COLUMN     "tournament_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamPlayers" DROP CONSTRAINT "TeamPlayers_pkey",
DROP COLUMN "playerId",
DROP COLUMN "teamId",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD COLUMN     "team_id" INTEGER NOT NULL,
ADD CONSTRAINT "TeamPlayers_pkey" PRIMARY KEY ("player_id", "team_id");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayers" ADD CONSTRAINT "TeamPlayers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayers" ADD CONSTRAINT "TeamPlayers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
