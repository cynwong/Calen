import { Router, Request, Response } from 'express';

import { checkIfAuthenticated } from '../../../../auth/expressPassport'
import { getAllEvents } from '../../../../../database/controllers/EventController';

const allEventsRoute:Router = Router();

allEventsRoute.get(
	'/',
	checkIfAuthenticated,
	async (req:Request, res: Response): Promise<void> => {
		const { user } = req;
		try {
			const events = await getAllEvents(user.id);
			res.status(200).json(events);
		} catch (err) {
			console.error(err);
			res.status(500).json({error: true});
		}
	}
);

export default allEventsRoute;