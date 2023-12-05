import { GreetingsResponseDto } from '@whiskmate/shared';
import { createContext } from 'react';

export interface GreetingsClient {
  getGreetings(): Promise<GreetingsResponseDto>;
}

class GreetingsClientImpl implements GreetingsClient {
  async getGreetings(): Promise<GreetingsResponseDto> {
    const response = await fetch('http://localhost:3333/greetings');
    return await response.json();
  }
}

export const GreetingsClientProvider = createContext(new GreetingsClientImpl());
