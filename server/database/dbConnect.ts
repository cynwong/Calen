import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(__dirname, 'config', '.env'),
});

const dbConnect = async (): Promise<void> => {
	const {
		NODE_ENV: nodeEnv,
		LOCAL_DB_CONNECTION_URI: localDB,
		MONGODB_URI: db,
	} = process.env;
	console.info(`Using '${nodeEnv}' environment..`);
	const connectURI = (nodeEnv === 'development' ? localDB : db) as string;
	const connect = async (): Promise<void> => {
		try {
			await mongoose.connect(
				connectURI,
				{
					useNewUrlParser: true,
					useFindAndModify: false,
					useUnifiedTopology: true,
				},
			);
			console.info('Successfully connected to Database.');
		} catch (error) {
			console.error('Error connecting to db: ', error);
		}
	};
	await connect();
	mongoose.connection.on('disconnected', connect);
};

export default dbConnect;