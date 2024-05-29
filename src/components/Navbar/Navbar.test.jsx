import { screen, render } from '@testing-library/react';
import Navbar from './Navbar';
import { describe, expect, test } from 'vitest';

describe('Navbar', () => {
  test('navbar renders correctly', () => {
    render(<Navbar />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toBeInTheDocument();
  });
});
