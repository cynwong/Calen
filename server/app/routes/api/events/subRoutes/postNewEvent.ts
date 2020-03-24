import { Router, Request, Response } from 'express';

import { checkIfAuthenticated } from '../../../../auth/expressPassport';
// import { getAllEvents } from '../../../../../database/controllers/EventController';

const postNewEvent:Router = Router();

postNewEvent.post(
	'/',
	checkIfAuthenticated,
	async (req:Request, res: Response): Promise<void> => {
		const { user, body } = req;
		console.log({user, body});
		res.end();
		// try {
		// 	const events = await getAllEvents(user.id);
		// 	res.status(200).json(events);
		// } catch (err) {
		// 	console.error(err);
			// res.status(500).json({error: true});
		// }
	}
);

export default postNewEvent;