import { delay } from 'tsyringe';

import { Greeting } from './greeting';

export interface GreetingsRepository {
  getGreetings(): Promise<Greeting[]>;
}

class GreetingsRepositoryImpl {
  async getGreetings(): Promise<Greeting[]> {
    throw new Error('🚧 work in progress!');
  }
}

export const GREETINGS_REPOSITORY_TOKEN = delay<GreetingsRepository>(
  () => GreetingsRepositoryImpl
);
