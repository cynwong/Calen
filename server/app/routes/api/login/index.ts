import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { Error } from '../../../../types/error/error';
import { UserDocument } from '../../../../database/models/User';

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
			req.logIn(user, (loginErr:Error): void => {
				if (loginErr) {
					console.error(loginErr);
					return next(loginErr);
				}
				res.status(200).json({ success: true });
			});
		})(req,res,next);
	}
);

export default loginRoute;