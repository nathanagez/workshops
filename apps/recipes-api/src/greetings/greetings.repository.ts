import { JSONSyncPreset } from 'lowdb/node';
import { delay } from 'tsyringe';

import { Greeting } from './greeting';

export interface GreetingsRepository {
  getGreetings(): Promise<Greeting[]>;
}

class GreetingsRepositoryImpl {
  private _db = JSONSyncPreset('greetings.db.json', {
    greetings: [
      {
        id: 'greet_1',
        label: 'Hi!',
      },
    ],
  });

  constructor() {
    this._db.write();
  }

  async getGreetings(): Promise<Greeting[]> {
    this._db.read();
    return this._db.data.greetings;
  }
}

export const GREETINGS_REPOSITORY_TOKEN = delay<GreetingsRepository>(
  () => GreetingsRepositoryImpl
);
