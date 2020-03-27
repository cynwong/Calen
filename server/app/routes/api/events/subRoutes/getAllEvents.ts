import { Router, Request, Response } from 'express';

import { UserDocument } from '../../../../../database/models/User';
import { getAllEvents } from '../../../../../database/controllers/EventController';

const allEventsRoute:Router = Router();

allEventsRoute.get(
	'/',
	async (req:Request, res: Response): Promise<void> => {
		const { user } = req;
		const userId = user && (user as UserDocument)._id;
		try {
			const events = await getAllEvents(userId as string);
			res.status(200).json(events);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: true });
		}
	},
);

export default allEventsRoute;
