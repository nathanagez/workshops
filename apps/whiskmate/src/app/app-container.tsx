import { ReactNode, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

export function AppContainer({ children }: { children: ReactNode }) {
  children = (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  children = <BrowserRouter>{children}</BrowserRouter>;

  children = <StrictMode>{children}</StrictMode>;

  return children;
}
