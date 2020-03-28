import { Request, Response } from 'express';

import { UserDocument } from '../../../../database/models/User';
import { getAllEvents } from '../../../../database/controllers/EventController';

export default async function isUserLoginAPI(req: Request, res: Response): Promise<void> {
	const { user } = req;
	if (!user) {
		res.status(200).json({
			success: true,
			user: undefined,
		});
		return;
	}
	const {
		id,
		email,
		firstName,
		lastName,
	} = user as UserDocument;
	const events = await getAllEvents(id);

	res.status(200).json({
		success: true,
		data: {
			user: {
				id,
				username: email,
				firstName,
				lastName,
				events,
			},
		},
	});
}
