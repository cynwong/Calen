import { Request, Response } from 'express';

import { UserDocument } from '../../../../database/models/User';
import { putSetting } from '../../../../database/controllers/SettingController';

export default async function putSettingAPI(req:Request, res: Response): Promise<void> {
	const { user, body } = req;
	const userId = user && (user as UserDocument)._id;
	try {
		const setting = await putSetting(userId, body);
		res.status(200).json(setting);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: true });
	}
}
