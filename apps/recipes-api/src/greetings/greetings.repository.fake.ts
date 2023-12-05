import { Greeting } from './greeting';
import { GreetingsRepository } from './greetings.repository';

export class GreetingsRepositoryFake implements GreetingsRepository {
  async getGreetings(): Promise<Greeting[]> {
    return [{ id: 'greet_1', label: 'Hi!' }];
  }
}
