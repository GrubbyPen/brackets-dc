import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { name, description, teamSize } = req.body;

	const session = await getSession({ req });
	if (session) {
		const result = await prisma.tournament.create({
			data: {
				name,
				description,
				teamSize,
				owners: {
					connect: {
						email: session?.user?.email!,
					},
				},
			},
		});
		res.json(result);
	} else {
		res.status(401).send({ message: 'Unauthorized' });
	}
}
