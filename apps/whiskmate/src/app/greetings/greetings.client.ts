import { GreetingsResponseDto } from '@whiskmate/shared';
import { createContext } from 'react';
import { axiosClient } from '../axios-client';

export interface GreetingsClient {
  getGreetings(): Promise<GreetingsResponseDto>;
}

class GreetingsClientImpl implements GreetingsClient {
  async getGreetings() {
    const { data } = await axiosClient.get<GreetingsResponseDto>('/greetings');
    return data;
  }
}

export const GreetingsClientProvider = createContext(new GreetingsClientImpl());
