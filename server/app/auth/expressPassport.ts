import { Request, Response, NextFunction } from 'express';

// Authentication Middleware functions
// Do not allow user to access without login 
export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

// do not allow login-user to access
export const forwardIfNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/login'); //TODO go to dashboard
}