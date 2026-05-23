import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './Context/ThemeContext';
import { SiteContentProvider } from './Context/SiteContentContext';

test('renders the insurance site', () => {
  render(
    <ThemeProvider>
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </ThemeProvider>
  );

  expect(screen.getAllByText(/Huelmo Seguros/i).length).toBeGreaterThan(0);
});
