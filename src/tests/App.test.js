import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing the App component', () => {
  it('should have elements with texts: Home, About and Favorite Pokémons', () => {
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(favoritePokemons).toBeDefined();
  });
});
