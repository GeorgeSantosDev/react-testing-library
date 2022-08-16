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
});
