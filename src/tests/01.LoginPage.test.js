import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

describe('Testa página de Login', () => {
  const INITIAL_STATE = {
    player: {
      email: 'exemplo@hotmail.com',
      name: 'João Sem-braço',
    },
  }

  it('Verifica se existem dois inputs na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/seu nome/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  it('Verifica se existem dois botões na tela de Login', () => {
    renderWithRouterAndRedux(<Login />);
    // const buttons =screen.getAllByRole('button');
    const playButton = screen.getByRole('button', { name: /play/i })
    const settingsButton = screen.getByRole('button', { name: /configurações/i })

    // expect(buttons).toBeInTheDocument(2);
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('Verifica se o botão "Play" é habilitado ao passar um email e username corretos', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/seu nome/i);
    const playButton = screen.getByText(/play/i);
    
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputEmail, 'exemplo@hotmail.com');
    userEvent.type(inputName, 'João Sem-braço');

    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeEnabled();
  });

  it('Verifica se a aplicação é redirecionada à página de jogo ao clicar em Play', () => {
    const { history } = renderWithRouterAndRedux(<Login />, INITIAL_STATE, '/game');

    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/seu nome/i);
    const playButton = screen.getByText(/play/i);
    
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputEmail, 'exemplo@hotmail.com');
    userEvent.type(inputName, 'João Sem-braço');

    expect(playButton).toBeInTheDocument();
    userEvent.click(playButton);
    expect(history.location.pathname).toBe('/game');
  });

  // it('Verifica se a aplicação é redirecionada à página de jogo ao clicar em Play', () => {
  //   store.dispatch(setEmail('testItem'));
  //   renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/game');

  //   expect(store.setEmail('exemplo@hotmail.com')).toEqual({player: {email: 'exemplo@hotmail.com'}});
  // });
});
