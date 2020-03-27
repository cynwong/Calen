import { Router, Request, Response } from 'express';
import * as passwordGenerator from 'generate-password';

import { UserDocument, User } from '../../../../database/models/User';

import sendEmail from '../../../lib/sendEmail';

const forgotPasswordRoute = Router();

forgotPasswordRoute.patch(
	'/',
	async (req:Request, res: Response): Promise<void> => {
		const { email } = req.body;
		console.log({email})
		try {
			const user:UserDocument = await User.findOne({ email }) as UserDocument;
			if(!user){
				res.status(401).json({error: 'Unauthorized'});
				return;
			}
			user.password = passwordGenerator.generate({
				length: 12,
				numbers: true, 
				uppercase: true,
				symbols: true
			});
			await sendEmail(user.email, user.password, user.firstName);
			res.status(200).json({success: true});
		} catch (err) {
			console.error(err);
			res.status(500).json({error: 'Something went wrong. Try again later.'})
		}
	}
);

export default forgotPasswordRoute;