import { Router, Request, Response } from 'express';
import { promisify } from 'util';
import quickemailverification from 'quickemailverification';

import { UserDocument, User } from '../../../../database/models/User';
import { createUser } from '../../../../database/controllers/UserController';

import { validateEmail, validatePassword } from '../../../lib/validate';

const signUpRoute = Router();

import verifyEmail from '../../../auth/verifyEmail';

signUpRoute.post(
	'/',
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
			
			const isEmailValid = await verifyEmail(email);
			if (!isEmailValid) {
				errors.push('A valid email address is required.');
			}
			const userWithSameEmail:UserDocument = await User.findOne({ email }) as UserDocument;
			if(userWithSameEmail) {
				errors.push('Email is already registered!');
			}
			if( errors.length !== 0 ) {
				return res.status(400).json({ errors });
			}
			await createUser({
				firstName,
				lastName,
				email,
				password
			} as UserDocument);
			res.status(200).json({ success: true });
		} catch (err) {
			console.error(err)
			res.status(500).json({
				error: ['Something went wrong. Try again later.']
			});
		}
	}
);

export default signUpRoute;