import cors from 'cors';
import express, { Application } from 'express';
import expressSession from 'express-session';
import morgan from 'morgan';
import passport from 'passport';

import { secretKey } from './auth/config';
import configurePassport from './auth/passport';

// routes
import apiRoutes from './routes/api';

const app:Application = express();

// configure passport
configurePassport(passport);

// set cors & logs middlewares
app.use(cors());
app.use(morgan('dev'));

// parsing application body middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session middlewares
app.use(expressSession({ 
	secret: secretKey as string, 
	resave: true, 
	saveUninitialized: true,
	cookie: {
		maxAge: 604800000,
		secure: true,
	}
}));

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// import routes
app.use('/api', apiRoutes);

// for production
if(process.env.NODE_ENV === 'production') {
	// set static folder
	// app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'build')));
	// app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')));
	console.log('prod')
}

export default app;
