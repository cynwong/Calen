import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { Error } from '../../../../types/error/error';
import { UserDocument } from '../../../../database/models/User';

const loginRoute = Router();

loginRoute.post(
	'/',

	(req:Request, res: Response, next: NextFunction): void => {
		console.log(req.body);
		console.log('=====')
		passport.authenticate('local', (err:Error, user:UserDocument): void => {
			console.log({user, err});
			if (err) {
				console.error(err);
				return next(err);
			}
			if (!user) {
				console.log("no user");
				res.status(401).json({ errors: ['Incorrect username or password']});
				return;
			}
			// log in user
			req.logIn(user, (loginErr:Error): void => {
				console.log(user)
				if (loginErr) {
					console.error(loginErr);
					return next(loginErr);
				}
				console.log(user);
				res.status(200).json({ success: true });
			});
		})(req,res,next);
	}
);

export default loginRoute;