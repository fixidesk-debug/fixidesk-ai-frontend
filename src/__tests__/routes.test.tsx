import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('routes', () => {
  it('renders home page', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Seamlessly integrates/i)).toBeInTheDocument();
  });

  it('renders not found for unknown route', async () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Not Found/i)).toBeInTheDocument();
  });
});


