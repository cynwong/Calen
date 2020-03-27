import { Router, Request, Response, NextFunction } from 'express';

const logOutRoute = Router();

logOutRoute.get("/", (req: Request, res: Response, next: NextFunction): void => {
	try {
		req.logout();
		res.status(200).json({
			success: true,
		});
	} catch (err) {
		next(err);
	}
});

export default logOutRoute;