import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export default function renderWithRouter(componet) {
  const history = createMemoryHistory();

  return ({
    ...render(<Router history={ history }>{componet}</Router>),
    history,
  });
}
