-- DropForeignKey
ALTER TABLE "TeamPlayers" DROP CONSTRAINT "TeamPlayers_player_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamPlayers" DROP CONSTRAINT "TeamPlayers_team_id_fkey";

-- AddForeignKey
ALTER TABLE "TeamPlayers" ADD CONSTRAINT "TeamPlayers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayers" ADD CONSTRAINT "TeamPlayers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
