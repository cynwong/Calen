import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { User, UserDocument } from '../../database/models/User';

const localStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	(username: string, password: string, done): void => {
		User.findOne({ email: username.toLowerCase() }, (err, user) => {
			if (err) { return done(err); }
			if (!user) {
				return done(new Error('Incorrect username or password'), false);
			}
			if (!user.validatePassword(password)) {
				return done(new Error('Incorrect username or password'), false);
			}
			return done(null, user);
		});
	},
);

// const jwtStrategy = new JWTStrategy(
// {
// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// secretOrKey: process.env.JWT_KEY,
// },
// (jwtPayload:any, done:(err:any, user:any)=>void) =>
// User.findById(jwtPayload.data._id, (err, user) => {
// if (err) {
// return done(err, false);
// }
// return done(null, user);
// }),
// );

// add strategies to passport
passport.use(localStrategy);
// passport.use(jwtStrategy);

passport.serializeUser((user:UserDocument, done: (_:undefined, userId:string)=>void) :void => {
	done(undefined, user._id);
});
passport.deserializeUser(
	async (id: string, done:(e:Error|null, u:UserDocument|boolean)=>void): Promise<void> => {
		try {
			const user = await User.findById(id);
			done(null, user as UserDocument);
		} catch (err) {
			console.error(err);
			done(err, false);
		}
	},
);

export default passport;
