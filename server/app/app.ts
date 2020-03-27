import cors from 'cors';
import express, { Application } from 'express';
import expressSession from 'express-session';
import morgan from 'morgan';
import {default as connectMongo} from 'connect-mongo';

import { secretKey } from './auth/config';
import passport from './auth/passport';

// routes
import apiRoutes from './routes/api/api';

const app:Application = express();

// set cors & logs middlewares
app.use(cors());
app.use(morgan('dev'));

// parsing application body middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session middlewares
const MongoStore = connectMongo(expressSession);
app.use(expressSession({ 
	secret: secretKey as string, 
	resave: false, 
	saveUninitialized: false,
	store: new MongoStore({
		url: process.env.NODE_ENV === 'development' ? process.env.LOCAL_DB_CONNECTION_URI as string : process.env.MONGODB_URI as string,
		autoRemove: 'interval',
		autoRemoveInterval: 10080 // In minutes. Default
	})
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
