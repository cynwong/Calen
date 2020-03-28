import {
	Request, Response, NextFunction,
} from 'express';
import passport from 'passport';

import { UserDocument } from '../../../../database/models/User';
import { getAllEvents } from '../../../../database/controllers/EventController';
import { getSetting } from '../../../../database/controllers/SettingController';

export default function LoginAPI(req:Request, res: Response, next: NextFunction): void {
	passport.authenticate('local', (err:Error, user:UserDocument): void => {
		if (err) {
			console.error(err);
			next(err);
			return;
		}
		if (!user) {
			res
				.status(401)
				.json({ errors: ['Incorrect username or password'] });
			return;
		}
		// log in user
		req.logIn(user, async (loginErr:Error): Promise<void> => {
			if (loginErr) {
				console.error(loginErr);
				next(loginErr);
				return;
			}
			try {
				const [events, settings] = await Promise.all([
					getAllEvents(user._id),
					getSetting(user._id),
				]);
				res.status(200).json({
					success: true,
					user: {
						id: user._id,
						username: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						events,
						settings,
					},
				});
			} catch (error) {
				next(error);
			}
		});
	})(req, res, next);
}
