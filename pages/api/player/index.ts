import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			// Get data from your database, need guard
			const id = req.query.tournamentId;
			res.status(200).json(
				await prisma.player.findMany({
					where: { tournamentId: Number(id) },
					select: { id: true, name: true },
				}),
			);
			break;
		case 'POST':
			const { tournamentId, name } = req.body;

			const session = await getSession({ req });
			if (session) {
				const result = await prisma.player.create({
					data: {
						tournamentId,
						name,
					},
				});
				res.json(result);
			} else {
				res.status(401).send({ message: 'Unauthorized' });
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
