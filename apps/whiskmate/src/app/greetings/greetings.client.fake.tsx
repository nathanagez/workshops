import { GreetingsClient, GreetingsClientProvider } from './greetings.client';
import { GreetingsResponseDto } from '@whiskmate/shared';
import React, { ReactNode } from 'react';

/**
 * Always returns a single greeting "Welcome!"
 */
export class GreetingsClientFake implements GreetingsClient {
  async getGreetings(): Promise<GreetingsResponseDto> {
    return {
      items: [
        {
          id: 'greet_1',
          label: 'Welcome!',
        },
      ],
    };
  }
}

export function WithGreetingsClientFake({ children }: { children: ReactNode }) {
  return (
    <GreetingsClientProvider.Provider value={new GreetingsClientFake()}>
      {children}
    </GreetingsClientProvider.Provider>
  );
}
