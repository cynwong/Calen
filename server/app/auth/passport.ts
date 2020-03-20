import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserDocument } from '../../database/models/User';

const localStrategy = new LocalStrategy(
	{
		usernameField: 'email',
	},
	(username: string, password: string, done): void => {
		console.log(username, password)
		User.findOne({ email: username.toLowerCase()}, (err, user) => {
			if (err) { return done(err); }
			if(!user) {
				return done(new Error('Incorrect username or password'), false);
			}
			if(!user.validatePassword(password)) {
				return done(new Error('Incorrect username or password'), false);
			}
			done(undefined, user);
		});
	}
);

export default (pp: any) => {
	console.log('start configuration');
	// local strategy
	pp.use(localStrategy);

	pp.serializeUser((user:UserDocument, done: (_:undefined, userId:string)=>void) :void=> {console.log('serialize');done(undefined, user.id)});
	pp.deserializeUser(async (id: string, done:(e:Error|null, u:UserDocument|boolean)=>void): Promise<void> => {
		try {
			const user = await User.findById(id);
			console.log('deserialize');
			done (null, user as UserDocument);
		} catch (err) {
			console.log(err);
			done(err, false);
		}
	});
}


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