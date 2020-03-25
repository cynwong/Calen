import { Router, Request, Response } from 'express';

import { createEvent } from '../../../../../database/controllers/EventController';
import { EventDocument } from '../../../../../database/models/Event';

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
		try {
			const newEvent = await createEvent({
				creator: user?._id,
				title,
				start,
				allDay,
				end,
				desc,
				location,
				notes
			} as EventDocument);
			res.status(200).json(newEvent);
		} catch (err) {
			console.error(err);
			res.status(500).json({error: true});
		}
	}
);

export default postNewEvent;