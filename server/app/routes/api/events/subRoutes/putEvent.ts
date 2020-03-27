import { Router, Request, Response } from 'express';

import { UserDocument } from '../../../../../database/models/User';
import { getEventById } from '../../../../../database/controllers/EventController';

const putEventRoute:Router = Router();

putEventRoute.put(
	'/:id',
	async (req:Request, res: Response): Promise<void> => {
		const { user, body } = req;
		const { id } = req.params;
		const userId = user && (user as UserDocument)._id;

		try {
			const event = await getEventById(id);

			if (!event.creatorId) {
				throw new Error();
			}
			// check if user is the creator of this event. Otherwise don't give the data
			if (String(event.creatorId) !== String(userId)) {
				res.status(401).json({ error: 'unauthorized' });
				return;
			}
			event.title = body.title;
			event.start = body.start;
			event.end = body.end;
			event.allDay = body.allDay;
			event.desc = body.desc;
			event.location = body.location;
			event.notes = body.notes;
			event.entry = body.entry;
			await event.save();
			res.status(200).json(event);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: true });
		}
	},
);
export default putEventRoute;
