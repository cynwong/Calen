import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// routes
import apiSignUpRoute from './routes/api/signup';

const app:Application = express();

// set cors & logs
app.use(cors());
app.use(morgan('dev'));

// parsing application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import routes
app.use('/api/signup', apiSignUpRoute);

// for production
if(process.env.NODE_ENV === 'production') {
	// set static folder
	// app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'build')));
	// app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')));
	console.log('prod')
}

export default app;
