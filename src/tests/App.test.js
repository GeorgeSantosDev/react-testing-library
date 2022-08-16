import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing the App component', () => {
  it('should have elements with texts: Home, About and Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(favoritePokemons).toBeDefined();
  });
  it('should redirect to Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });
  it('should redirect to About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
  });
  it('should redirect to Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritePokemons);

    expect(history.location.pathname).toBe('/favorites');
  });
  it('should redirect to Not Found Page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons-lendarios');
    const msgError = screen.getByRole('heading', { name: /not found/i, level: 2 });

    expect(history.location.pathname).toBe('/pokemons-lendarios');
    expect(msgError).toBeInTheDocument();
  });
});
