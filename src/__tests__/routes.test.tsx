import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('routes', () => {
  it('renders home page', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(await findByText(/Seamlessly integrates/i)).toBeInTheDocument();
  });

  it('renders not found for unknown route', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );
    expect(await findByText(/Not Found/i)).toBeInTheDocument();
  });
});