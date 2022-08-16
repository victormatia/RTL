import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Aplica casos de teste em FavoritePokemons.js', () => {
  it('Verifica se a mensagem: No favorite pokemons found, é exibida na tela', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavoritePokemons);
    const notFoundMesseger = screen.getByText(/No favorite pokemon found/i);

    expect(history.location.pathname).toBe('/favorites');
    expect(notFoundMesseger).toBeInTheDocument();
  });

  it('Verifica se os Pokemons favoritados aparem na tela', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const isFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(isFavorite);

    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavoritePokemons);

    const notFoundMesseger = screen.queryByText(/No favorite pokemon found/i);
    const pokemons = screen.getAllByRole('img');

    expect(history.location.pathname).toBe('/favorites');
    expect(notFoundMesseger).not.toBeInTheDocument();
    pokemons.forEach((pokemon) => expect(pokemon).toBeInTheDocument());
  });
});
