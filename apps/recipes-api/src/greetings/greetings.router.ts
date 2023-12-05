import { Router } from 'express';
import { GreetingsResponseDto } from '@whiskmate/shared';
import { GREETINGS_REPOSITORY_TOKEN } from './greetings.repository';
import { inject } from '../di';

export const greetingsRouter = Router();

greetingsRouter.get('/greetings', async (_, res) => {
  const repo = inject(GREETINGS_REPOSITORY_TOKEN);

  const body: GreetingsResponseDto = {
    items: await repo.getGreetings(),
  };

  res.send(body);
});
