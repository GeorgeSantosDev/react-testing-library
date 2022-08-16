import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testing Favorite Pokemon Page', () => {
  it('should render the message No favorite pokemon found', () => {
    const pokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const message = screen.getByText(/No favorite pokemon found/i);

    expect(message).toBeDefined();
  });
  it('should render all the favorite Pokemons', () => {
    const pokemons = [
      {
        id: 148,
        name: 'Dragonair',
        type: 'Dragon',
        averageWeight: {
          value: '16.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
      },
      {
        id: 143,
        name: 'Snorlax',
        type: 'Normal',
        averageWeight: {
          value: '460.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const images = screen.getAllByRole('img', { name: /marked as favorite/i });

    expect(images).toHaveLength(2);
  });
});
