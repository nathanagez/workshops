import { expect, test } from '@playwright/experimental-ct-react';
import Greetings from './greetings';
import { WithGreetingsClientFake } from './greetings.client.fake';

test('Greetings should be polite', async ({ page, mount }) => {
  const component = await mount(
    <WithGreetingsClientFake>
      <Greetings />
    </WithGreetingsClientFake>
  );
  await expect(component).toContainText('Welcome!');
});
