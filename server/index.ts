import express, { Application, Request, Response } from 'express';

// TODO this import/no-named-as-default and import/named are going in cycle
// how do we fix this.
// import { dbConnect } from './server/dbConnect';

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => res.send('Hello world!'));


// init server
(async () => {
	try {
		// await dbConnect();
		app.listen(port, () => console.info(`App running on port ${port}`));
	} catch (err) {
		console.error(err);
	}
})();
