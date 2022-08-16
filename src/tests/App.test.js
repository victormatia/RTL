import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Aplica casos de teste em App.js', () => {
  it('Verifica se há um conjunto de links fixos em App.js', () => {
    renderWithRouter(<App />);

    const navLinks = screen.getAllByRole('link');

    expect(navLinks[0].innerHTML).toBe('Home');
    expect(navLinks[1].innerHTML).toBe('About');
    expect(navLinks[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Verifica se é possível ir para a página Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });

    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se é possível ir para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se é possível ir para a página Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /favorite/i });

    userEvent.click(linkFavorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se a página é redirecinada para Not Found quando a url não existe', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/urlInvalida');

    const pageNotFoundMesseger = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });

    expect(pageNotFoundMesseger).toBeInTheDocument();
  });
});
