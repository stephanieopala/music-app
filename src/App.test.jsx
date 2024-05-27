import { screen, render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders hello world', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });
});
