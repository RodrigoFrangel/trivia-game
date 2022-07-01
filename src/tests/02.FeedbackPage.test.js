import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Página de Feedback', () => {
  const INITIAL_STATE = {
    player: {
      name: 'João Sem-braço',
      score: 0,
    },
  }

  it('deve ser redirecionada à página de Login ao clicar em Play Again', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/');

    const playerName = screen.getByText(/João Sem-braço/i);
    const playAgainBtn = screen.getByText(/Play Again/i);
    
    expect(playerName).toBeInTheDocument();

    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('deve redirecionada à página de Ranking ao clicar em Ranking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/');

    const playerName = screen.getByText(/João Sem-braço/i);
    const rankingBtn = screen.getByText(/Ranking/i);
    
    expect(playerName).toBeInTheDocument();

    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });
});
