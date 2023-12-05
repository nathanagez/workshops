import { Router } from 'express';
import { GreetingsResponseDto } from '@whiskmate/shared';

export const greetingsRouter = Router();

greetingsRouter.get('/greetings', (_, res) => {
  const body: GreetingsResponseDto = {
    items: [
      {
        id: 'hi',
        label: 'Hi!',
      },
    ],
  };
  res.send(body);
});
