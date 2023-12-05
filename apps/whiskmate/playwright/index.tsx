import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { AppContainer } from '../src/app/app-container';

beforeMount(async ({ App }) => {
  return (
    <AppContainer>
      <App />
    </AppContainer>
  );
});
