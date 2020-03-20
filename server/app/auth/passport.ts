import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User, UserDocument } from '../../database/models/User';

const localStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password'
	},
	(username: string, password: string, done): void => {
		User.findOne({ email: username.toLowerCase()}, (err, user) => {
			if (err) { return done(err); }
			if(!user) {
				return done(new Error('Incorrect username or password'), false);
			}
			if(!user.validatePassword(password)) {
				return done(new Error('Incorrect username or password'), false);
			}
			done(null, user);
		});
	}
);

// add strategies to passport
passport.use(localStrategy);

passport.serializeUser((user:UserDocument, done: (_:undefined, userId:string)=>void) :void=> done(undefined, user.id));
passport.deserializeUser(async (id: string, done:(e:Error|null, u:UserDocument|boolean)=>void): Promise<void> => {
	try {
		const user = await User.findById(id);
		done (null, user as UserDocument);
	} catch (err) {
		console.log(err);
		done(err, false);
	}
});

export default passport;



// Local Strategy
// passport.use('local', new LocalStrategy( 
// 	{
// 		usernameField: 'email', 
// 		passwordField: 'password'
// 	},
// 	async (email:string, password:string, done):Promise<void> => {
// 		console.log('basic')
		
// 	}
// ));



// export default passport;