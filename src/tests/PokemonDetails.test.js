import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const WAY = '/pokemons/25';

describe('Testing Pokemon Details page', () => {
  it('should have a pokemons detailed infos', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(WAY);

    const details = screen.getByRole('heading', { name: /Details/i, level: 2 });
    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(moreDetails).not.toBeInTheDocument();
    expect(details).toBeDefined();
    expect(summary).toBeDefined();
    expect(paragraph).toBeDefined();
  });

  it('should have a section with maps', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(WAY);

    const heading = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    const maps = screen.getAllByRole('img', { name: /Pikachu location/i });
    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    const location2 = screen.getByText(/Kanto Power Plant/i);

    // expect(moreDetails).not.toBeInTheDocument();
    expect(heading).toBeDefined();
    expect(maps).toHaveLength(2);
    expect(maps[0]).toBeDefined();
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toBeDefined();
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(location1).toBeDefined();
    expect(location2).toBeDefined();
  });

  it('should be posible to favorite pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(WAY);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    userEvent.click(checkbox);
    const checkfav1 = screen.getByRole('img', { name: /Pikachu is marked as Favorite/i });

    expect(checkfav1).toBeDefined();

    userEvent.click(checkbox);
    const checkfav2 = screen
      .queryByRole('img', { name: /Pikachu is marked as Favorite/i });

    expect(checkfav2).not.toBeInTheDocument();
  });
});
