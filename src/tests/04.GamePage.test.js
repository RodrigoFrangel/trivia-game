import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

describe('Página de Game', () => {
  it('deve conter um <header> com nome e imagem do jogador', () => {
    renderWithRouterAndRedux(<Game />);
    const header = screen.getByTestId('header-player-info');
    const playerName = screen.getByRole('heading'); 
    const playerImage = screen.getByRole('img');

    expect(header).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerImage).toBeInTheDocument();
  });

  it('deve exibir um timer', () => {
    // renderWithRouterAndRedux(<Game />);
  });

  it('deve conter uma <div> que recebe perguntas', () => {
    // renderWithRouterAndRedux(<Game />);
  });

  it('deve exibir o placar do jogador', () => {
    // renderWithRouterAndRedux(<Game />);
  });

  it('deve mostrar um botão "Next" ao zerar o timer', async () => {
    // renderWithRouterAndRedux(<Game />);
  });
});
