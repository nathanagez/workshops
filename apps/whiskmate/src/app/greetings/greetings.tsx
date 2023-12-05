import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { GreetingsClientProvider } from './greetings.client';

export function Greetings() {
  const client = useContext(GreetingsClientProvider);
  const { data } = useQuery({
    queryKey: ['greetings'],
    queryFn: () => client.getGreetings(),
  });

  return <h1>{data?.items[0].label}</h1>;
}

export default Greetings;
