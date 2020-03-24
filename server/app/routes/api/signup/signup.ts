import { Router, Request, Response } from 'express';

import { UserDocument } from '../../../../database/models/User';
import { createUser } from '../../../../database/controllers/UserController';
import { forwardIfNotAuthenticated } from '../../../auth/expressPassport';

import { validateEmail, validatePassword } from '../../../lib/validate';

const signUpRoute = Router();

signUpRoute.post(
	'/',
	forwardIfNotAuthenticated,
	async (req: Request, res: Response) => {
		try {
			const {
				firstName,
				lastName,
				email,
				password,
			} = req.body;
	
			// validation
			let errors = [];
			if (!lastName) {
				errors.push('Last name is required');
			}
			
			errors = [ ...errors, ...validateEmail(email), ...validatePassword(password) ];
			
			const userWithSameEmail:UserDocument = await User.findOne({ email }) as UserDocument;
			if(userWithSameEmail) {
				errors.push('Email is already registered!');
			}
			if( errors.length !== 0 ) {
				res.status(400).json({ errors });
			}
			await createUser({
				firstName,
				lastName,
				email,
				password
			} as UserDocument);
			res.status(200).json({ success: true });
		} catch (err) {
			res.status(500).json({
				error: ['Something went wrong. Try again later.']
			});
		}
	}
);

export default signUpRoute;