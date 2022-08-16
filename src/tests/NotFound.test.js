import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Aplica casos de teste em NotFound.js', () => {
  it('Verifica se na página existe um Heading com texto desejado', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se na página existe a imagem desejada', () => {
    render(<NotFound />);

    const img = screen.getByAltText(/pikachu crying/i);

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
