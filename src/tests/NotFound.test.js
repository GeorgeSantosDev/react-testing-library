import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testing Not Found Page', () => {
  it('should have heading h2 with the text Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(h2).toBeDefined();
  });
  it('should have an image with an specific URL', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /Pikachu crying/i });

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
