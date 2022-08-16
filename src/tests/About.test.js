import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Aplica casos de teste em About.js', () => {
  it('Verifica se existe um Heading com o texto desejado', () => {
    render(<About />);

    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se existe uma imagem da pokedex', () => {
    render(<About />);

    const imgPokedex = screen.getByAltText(/pokédex/i);

    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Verifica se existem dois parágrafos com texto desejado', () => {
    render(<About />);

    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    const paragraph2 = screen.getByText(/one can filter pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
