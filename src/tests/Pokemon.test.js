import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Aplica casos de teste em Pokemon.js', () => {
  it('Verifica se as informações corretas do primeiro pokemon aparecem na tela', () => {
    renderWithRouter(<App />);

    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[0];
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId(/pokemon-weight/i);
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName.innerHTML).toBe(name);
    expect(pokemonType.innerHTML).toBe(type);
    expect(pokemonWeigth.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  it('Verifica se as informações corretas do segundo pokemon aparecem na tela', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByTestId(/next-pokemon/i);
    userEvent.click(nextPokemonButton);

    const { name, type, image, averageWeight: { value, measurementUnit } } = pokemons[1];
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId(/pokemon-weight/i);
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName.innerHTML).toBe(name);
    expect(pokemonType.innerHTML).toBe(type);
    expect(pokemonWeigth.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  it('Verifica se na pokedex existe um link de mais informações do pokemon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);

    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  it('Verifica se a página de mais informações possuem o url correta', () => {
    const { history } = renderWithRouter(<App />);

    let moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { id } = pokemons[0];

    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);

    const nextPokemonButton = screen.getByTestId(/next-pokemon/i);
    userEvent.click(nextPokemonButton);

    moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[1].id}`);
  });

  it('Verifica se os pokemons favoritados possuem o icone de favorito', () => {
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
