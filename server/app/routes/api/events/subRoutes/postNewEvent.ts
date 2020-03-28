import { Request, Response } from 'express';

import { createEvent } from '../../../../../database/controllers/EventController';
import { UserDocument } from '../../../../../database/models/User';

export default async function postNewEventAPI(req:Request, res: Response): Promise<void> {
	const { user, body } = req;
	const {
		title,
		start,
		end,
		allDay,
		type,
		desc,
		entry,
		category,
		location,
		notes,
	} = body;
	const userId = user && (user as UserDocument)._id as String;
	try {
		const newEvent = await createEvent({
			creatorId: userId as string,
			title,
			start,
			end,
			allDay,
			type,
			desc,
			entry,
			category,
			location,
			notes,
		});
		res.status(200).json(newEvent);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: true });
	}
}
