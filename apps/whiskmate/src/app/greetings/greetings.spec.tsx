import { render, waitFor } from '@testing-library/react';
import { WithGreetingsClientFake } from './greetings.client.fake';
import Greetings from './greetings';
import { AppContainer } from '../app-container';

describe('App', () => {
  it('should have a greeting as the title', async () => {
    const { container } = render(
      <AppContainer>
        <WithGreetingsClientFake>
          <Greetings />
        </WithGreetingsClientFake>
      </AppContainer>
    );

    await waitFor(() => expect(container.textContent).toEqual('Welcome!'));
  });
});
