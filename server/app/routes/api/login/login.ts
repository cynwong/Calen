import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { UserDocument } from '../../../../database/models/User';
import { getAllEvents } from '../../../../database/controllers/EventController';

const loginRoute = Router();

loginRoute.post(
	'/',
	(req:Request, res: Response, next: NextFunction): void => {
		passport.authenticate('local', (err:Error, user:UserDocument): void => {
			if (err) {
				console.error(err);
				return next(err);
			}
			if (!user) {
				res
					.status(401)
					.json({ errors: ['Incorrect username or password']});
				return;
			}
			// log in user
			req.logIn(user, async (loginErr:Error): Promise<void> => {
				if (loginErr) {
					console.error(loginErr);
					return next(loginErr);
				}
				try {
					// const token = jwt.sign(
					// 	{ data: user }, 
					// 	process.env.JWT_KEY as string,
					// 	{ expiresIn: 604800 } // one week
					// );
					const events = await getAllEvents(user._id);
					res.status(200).json({ 
						success: true,
						// token: `Bearer ${token}`,
						user: {
							username: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							events
						}
					});
				} catch (err) {
					next(err);
				}
			});
		})(req,res,next);
	}
);

export default loginRoute;