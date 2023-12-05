import { expect, test } from '@playwright/experimental-ct-react';
import App from './app';

test('App should have a greeting as a title', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component.getByRole('heading', { level: 1 })).toContainText(
    'Welcome to whiskmate'
  );
});
