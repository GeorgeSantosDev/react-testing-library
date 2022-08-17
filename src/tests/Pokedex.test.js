import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

const NUMBER_OF_TYPE_BUTTONS = 7;
const PROPS_IDS_FAVORITED = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};
const ALL_POKEMONS = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
  'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

describe('Testing Pokedex Page', () => {
  it('should have heading h2 with the text Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ PROPS_IDS_FAVORITED }
        pokemons={ pokemons }
      />,
    );
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(h2).toBeDefined();
  });

  it('should show just on Pokemon at time and the next pokemon when click the button',
    () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ PROPS_IDS_FAVORITED }
          pokemons={ pokemons }
        />,
      );
      const button = screen.getByRole('button', { name: /Próximo pokémon/i });
      const pokemonName = screen.getByText('Pikachu');

      expect(pokemonName).toBeDefined();
      expect(button).toBeDefined();

      ALL_POKEMONS.forEach((pokemon) => {
        userEvent.click(button);

        const newPokemonName = screen.getAllByTestId('pokemon-name');

        expect(newPokemonName[0].innerHTML).toBe(pokemon);
        expect(newPokemonName).toHaveLength(1);
      });
    });

  it('should have filter buttons', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal',
      'Dragon'];

    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ PROPS_IDS_FAVORITED }
        pokemons={ pokemons }
      />,
    );
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    expect(filterButtons).toHaveLength(NUMBER_OF_TYPE_BUTTONS);

    types.forEach((type, i) => {
      expect(filterButtons[i].innerHTML).toBe(type);
    });

    types.forEach((type) => {
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const typeButton = screen.getByRole('button', { name: type });

      userEvent.click(typeButton);
      const pokemonType = screen.getByTestId('pokemon-type');

      expect(pokemonType.innerHTML).toBe(type);

      if (!nextPokemonButton.disabled) {
        userEvent.click(nextPokemonButton);
        const typeOfNewPokemon = screen.getByTestId('pokemon-type');

        expect(typeOfNewPokemon.innerHTML).toBe(type);
      }
    });
  });
  it('should button all is visible and defined', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ PROPS_IDS_FAVORITED }
        pokemons={ pokemons }
      />,
    );
    const allButton = screen.getByRole('button', { name: /All/i });
    const fireButton = screen.getByRole('button', { name: /Fire/i });
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(allButton).toBeDefined();
    expect(allButton).toBeVisible();

    userEvent.click(fireButton);
    userEvent.click(allButton);

    ALL_POKEMONS.forEach((pokemon) => {
      userEvent.click(nextPokemonButton);
      expect(screen.getByText(pokemon)).toBeInTheDocument();
    });
  });
});
