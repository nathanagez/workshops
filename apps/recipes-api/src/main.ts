import express from 'express';
import { greetingsRouter } from './greetings.router';

const app = express();

app.use(greetingsRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
