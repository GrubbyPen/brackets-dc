import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { shuffle } from '../util';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		// case 'GET':
		// 	// Get data from your database, need guard
		// 	const id = req.query.tournamentId;
		// 	res.status(200).json(
		// 		await prisma.team.findMany({
		// 			where: { tournamentId: Number(id) },
		// 			select: { id: true, name: true },
		// 		}),
		// 	);
		// 	break;
		case 'POST':
			const { tournamentId } = req.body;

			const session = await getSession({ req });
			if (session) {
				const tournament = await prisma.tournament.findFirstOrThrow({
					where: {
						id: tournamentId,
					},
					select: {
						teamSize: true,
					},
				});

				// get players from tournament not yet in a team

				const players = await prisma.player.findMany({
					where: {
						AND: [
							{
								tournamentId,
							},
							{
								NOT: {
									teams: { some: {} },
								},
							},
						],
					},
					select: {
						id: true,
						name: true,
					},
				});

				// check if there are enough players
				if (players.length % tournament.teamSize === 1) {
					res.status(400).send({
						message: "Incorrect number of players provided, can't form team. Please add or remove players.",
					});
					return;
				}
				// shuffle players
				const shuffled = shuffle(players);

				// create teams
				const numberOfTeams = Math.ceil(players.length / tournament.teamSize);
				for (let i = 0; i < numberOfTeams; i++) {
					const tp = shuffled.splice(0, tournament.teamSize);
					const teamName = tp.map(player => player.name).join(' & ');

					await prisma.team.create({
						data: {
							// teamId: ulid(),
							tournament: { connect: { id: tournamentId } },
							name: teamName,
							players: {
								create: tp.map(p => ({
									player: {
										connect: {
											id: p.id,
										},
									},
									assignedBy: {
										connect: {
											email: session?.user?.email!,
										},
									},
								})),
							},
						},
					});
				}
				const result = await prisma.team.findMany({
					where: { tournamentId: Number(tournamentId) },
					select: { id: true, name: true },
				});
				res.json(result);
				res.status(200).send({ message: `${numberOfTeams} Team(s) Created` });
			} else {
				res.status(401).send({ message: 'Unauthorized' });
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
