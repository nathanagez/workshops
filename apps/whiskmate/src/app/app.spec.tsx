import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should have a greeting as the title', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('heading', { level: 1 }).textContent).toContain(
      'Welcome to whiskmate'
    );
  });
});
