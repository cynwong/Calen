import {
	Request, Response, NextFunction,
} from 'express';

export default function logOutAPI(req: Request, res: Response, next: NextFunction): void {
	try {
		req.logout();
		res.status(200).json({
			success: true,
		});
	} catch (err) {
		next(err);
	}
}
