import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { axe } from 'jest-axe';

describe('a11y', () => {
  it('home has no obvious a11y violations', async () => {
    const { container, findByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await findByText(/Seamlessly integrates/i);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});


