import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testing Pokemon Component', () => {
  it('should render a card with Pokemon info', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ false }
        pokemon={ pokemons[0] }
      />,
    );
    const pokemonName = screen.getByText(/Pikachu/i);
    const pokemonType = screen.getByText(/Electric/i);
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokemonImage = screen.getByRole('img', { name: /Pikachu/i });

    expect(pokemonName).toBeDefined();
    expect(pokemonType).toBeDefined();
    expect(pokemonWeight).toBeDefined();
    expect(pokemonImage).toBeDefined();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('should have a link navegation a it should redirect to pokemons details', () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite={ false }
        pokemon={ pokemons[0] }
      />,
    );
    const linkToDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkToDetails).toBeDefined();
    userEvent.click(linkToDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('should have star icon in favorited pokemons', () => {
    renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ pokemons[0] }
      />,
    );
    const starIcon = screen
      .getByRole('img', { name: /Pikachu is marked as Favorite/i });

    expect(starIcon).toBeDefined();
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
