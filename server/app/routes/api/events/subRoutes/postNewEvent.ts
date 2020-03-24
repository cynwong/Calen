import { Router, Request, Response } from 'express';

import { checkIfAuthenticated } from '../../../../auth/expressPassport';
import { createEvent } from '../../../../../database/controllers/EventController';
import { EventDocument } from '../../../../../database/models/Event';

const postNewEvent:Router = Router();

postNewEvent.post(
	'/',
	checkIfAuthenticated,
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
			await createEvent({
				creator: user?._id,
				title,
				start,
				allDay,
				end,
				desc,
				location,
				notes
			} as EventDocument);
			res.status(200).json({success: true});
		} catch (err) {
			console.error(err);
			res.status(500).json({error: true});
		}
	}
);

export default postNewEvent;