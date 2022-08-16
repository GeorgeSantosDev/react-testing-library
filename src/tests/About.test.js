import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testing about Page', () => {
  it('should have a Pokedex information', () => {
    renderWithRouter(<About />);
    const pokedexInformation = screen.getByText(/This application simulates a Pokédex/i);

    expect(pokedexInformation).toBeDefined();
  });
  it('should have a heading h2 with the Text About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(title).toBeDefined();
  });
  it('should have 2 paragraph with Pokedex information', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
  });
});
