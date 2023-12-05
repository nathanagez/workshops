import { Router } from 'express';

export const greetingsRouter = Router();

greetingsRouter.get('/greetings', (_, res) => {
  res.send({
    items: [
      {
        id: 'hi',
        label: 'Hi!',
      },
    ],
  });
});
