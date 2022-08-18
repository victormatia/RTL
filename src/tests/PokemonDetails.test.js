import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Aplica casos de teste para PokemonDetails', () => {
  it('Verifica se os detalhes do pokemon é exibido corretamente', () => {
    const { name, summary } = pokemons[0];

    renderWithRouter(<App />);

    let moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    moreDetailsLink = screen.queryByRole('link', { name: /more details/i });
    const detailsPokemon = screen.getByRole('heading', { name: `${name} Details` });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    const summaryParagraph = screen.getByText(summary);

    expect(moreDetailsLink).toBe(null);
    expect(detailsPokemon).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });

  it('Verifica se os mapas das regiões dos pokemons aparecem de forma correta', () => {
    const { name, foundAt } = pokemons[0];

    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const locationsPokemon = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    const maps = screen.getAllByRole('img', { name: `${name} location` });
    const urlMaps = maps.map((map) => map.src);

    expect(locationsPokemon).toBeInTheDocument();
    expect(maps.length).toBe(foundAt.length);

    foundAt.forEach((e) => {
      const location = screen.getByText(e.location);

      expect(location).toBeInTheDocument();
      expect(urlMaps.includes(e.map)).toBe(true);
    });
  });

  it('Verifica se é possível favoritar um pokemon da página de mais detalhes', () => {
    renderWithRouter(<App />);

    const { name } = pokemons[0];
    let iconFavorite = screen.queryByRole('img',
      { name: `${name} is marked as favorite` });

    expect(iconFavorite).toBe(null);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const isFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(isFavorite);

    iconFavorite = screen.queryByRole('img',
      { name: `${name} is marked as favorite` });

    expect(iconFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(iconFavorite.alt).toBe(`${name} is marked as favorite`);
  });
});
