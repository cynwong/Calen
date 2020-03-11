import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request, Response, NextFunction } from 'express';

import { User } from '../../database/models/User';

passport.serializeUser<any, any>((user, done) => done(undefined, user.id));
passport.deserializeUser<any, any>((id, done): void => {
	User.findById(id, (err,user) => {
		if(err) {
			return done(err, false);
		}
		done(undefined, user);
	});
});

// Local Strategy
passport.use(new LocalStrategy( 
	{
		usernameField: 'email', 
		passwordField: 'password'
	},
	(email, password, done) => {
		User.findOne ({ email: email.toLowerCase() }, (err, user: any) => {
			if(err) { return done(err); }
			const errMsg = { message: 'Incorrect username or password' };
			if(!user) {
				return done(undefined, false, errMsg);
			}
			if(!user.validatePassword(password)) {
				return done(undefined, false, errMsg);
			}
			return done(undefined, user);
		});
	}
));

// Authentication Middleware functions
// Do not allow user to access without login 
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

// do not allow login-user to access
export const forwardIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

// import { Strategy as LocalStrategy } from 'passport-local';
// import passport from 'passport';

// import { IUser, User } from '../../database/models/User';

// export default function (passport:) {
// 	passport.use(
// 		'login',
// 		new LocalStrategy(
// 			{ 
// 				usernameField: 'email',
// 				passwordField: 'password'
// 			},
// 			async (email, password, done) => {
// 				try {
// 					// find user
// 					const user = await User.findOne({ email });
// 					if (!user) {
// 						return done(null, false, { message: 'Incorrect username / password'});
// 					}
// 					// Validate password
// 					if (!user.validatePassword(password)) {
// 						return done(null, false, { message: 'Incorrect username / password'});
// 					}
// 					return done(null, user);
// 				} catch (err) {
// 					return done(err);
// 				}
// 			}
// 		)
// 	);
// 	passport.serializeUser(({ id: }, done) => done(null, id));

// 	passport.deserializeUser(async (id, done) => {
// 		try {
// 			const dbUser = await User.findById(id);
// 			return done(null, dbUser);
// 		} catch (error) {
// 			return done(error);
// 		}
// 	});
// }