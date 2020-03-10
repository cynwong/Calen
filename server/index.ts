import app from './app';

const HOST = 'http://127.0.0.1';
const PORT = process.env.PORT || 8080;

// set up server
app.listen(PORT, () => console.info(`Server listening on: ${HOST}:${PORT}`));
