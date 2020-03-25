import { Router, Request, Response } from 'express';

import { createEvent } from '../../../../../database/controllers/EventController';
import { EventDocument } from '../../../../../database/models/Event';
import { UserDocument } from '../../../../../database/models/User';

const postNewEvent:Router = Router();

postNewEvent.post(
	'/',
	async (req:Request, res: Response): Promise<void> => {
		const { user, body } = req;
		const {
			title,
			start,
			allDay,
			end,
			desc,
			location,
			notes
		} = body;
		const userId = user && (user as UserDocument)._id as String;
		try {
			const newEvent = await createEvent({
				creatorId: userId as string,
				title,
				start,
				allDay,
				end,
				desc,
				location,
				notes
			});
			res.status(200).json(newEvent);
		} catch (err) {
			console.error(err);
			res.status(500).json({error: true});
		}
	}
);

export default postNewEvent;