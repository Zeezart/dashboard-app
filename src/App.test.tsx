import { render, screen } from '@testing-library/react';
import App from './app/page';

test('renders main heading', () => {
  render(<App />);
  const heading = screen.getByText(/dashboard/i);
  expect(heading).toBeInTheDocument();
});
