import { Request, Response } from 'express';

import { createSettings } from '../../../../database/controllers/SettingController';
import { UserDocument } from '../../../../database/models/User';

export default async function postNewSettingAPI(req:Request, res: Response): Promise<void> {
	const { user, body } = req;
	const {
		calendarColour,
		diaryColour,
		taskColour,
		mealPlanColour,
		googleCalendarIds,
	} = body;
	const userId = user && (user as UserDocument)._id as String;
	try {
		const newSetting = await createSettings({
			userId: userId as string,
			calendarColour,
			diaryColour,
			taskColour,
			mealPlanColour,
			googleCalendarIds: googleCalendarIds || [],
		});
		res.status(200).json(newSetting);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: true });
	}
}
