// load environmental variables
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(__dirname, 'config', '.env'),
});

// load database and app
import app from './app/app';
import dbConnect from './database/dbConnect';

const PORT = process.env.PORT || 8080;

// init server
(async () => {
	try {
		await dbConnect();
		app.listen(PORT, () => console.info(`App running on port ${PORT}`));
	} catch (err) {
		console.error(err);
	}
})(); 