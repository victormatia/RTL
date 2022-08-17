import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Aplica casos de teste em Pokedex.js', () => {
  it('Verifica se existe um heading na tela com o texto desejado', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se é possível passar para o próximo pokémon da lista', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();

    const buttonNextPokemon = screen.getByTestId(/next-pokemon/i);
    userEvent.click(buttonNextPokemon);

    const currentPokemon = screen.getByText(pokemons[1].name);

    expect(currentPokemon).toBeInTheDocument();
  });

  it('Verifica se, após mudar para o próximo, existe apenas um pokemon na tela', () => {
    renderWithRouter(<App />);

    const buttonNextPokemon = screen.getByTestId(/next-pokemon/i);
    userEvent.click(buttonNextPokemon);

    const pokemonsOnScreen = screen.getAllByTestId(/pokemon-name/i);

    expect(pokemonsOnScreen.length).toEqual(1);
  });

  it('Verifica se existem botões de filtragem por tipo de pokemon', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);

    filterButtons.forEach((button) => {
      expect(types.includes(button.innerHTML)).toBe(true);
    });
  });

  it('Verifica se é possível filtrar por tipo de pokemon', () => {
    renderWithRouter(<App />);

    let filterButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(filterButton);

    const currentType = screen.getByTestId('pokemon-type');

    expect(currentType.innerHTML).toBe('Fire');

    const buttonNextPokemon = screen.getByTestId(/next-pokemon/i);
    userEvent.click(buttonNextPokemon);

    expect(currentType.innerHTML).toBe('Fire');

    filterButton = screen.getByRole('button', { name: /bug/i });
    userEvent.click(filterButton);

    expect(currentType.innerHTML).toBe('Bug');

    userEvent.click(buttonNextPokemon);

    expect(currentType.innerHTML).toBe('Bug');
  });

  it('Verifica se é possível limpar os filtros de tipo de pokemon', () => {
    renderWithRouter(<App />);

    let filterButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(filterButton);

    const currentType = screen.getByTestId('pokemon-type');

    expect(currentType.innerHTML).toBe('Fire');

    const buttonNextPokemon = screen.getByTestId(/next-pokemon/i);
    userEvent.click(buttonNextPokemon);

    expect(currentType.innerHTML).toBe('Fire');

    filterButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(filterButton);

    expect(currentType.innerHTML).toBe(pokemons[0].type);

    userEvent.click(buttonNextPokemon);

    expect(currentType.innerHTML).toBe(pokemons[1].type);
  });
});
