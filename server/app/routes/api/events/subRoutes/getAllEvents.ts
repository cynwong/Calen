import { Request, Response } from 'express';

import { UserDocument } from '../../../../../database/models/User';
import { getAllEvents } from '../../../../../database/controllers/EventController';

export default async function getAllEventAPI(req:Request, res: Response): Promise<void> {
	const { user } = req;
	const userId = user && (user as UserDocument)._id;
	try {
		const events = await getAllEvents(userId as string);
		res.status(200).json(events);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: true });
	}
}
