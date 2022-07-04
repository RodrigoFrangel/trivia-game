import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

describe('Página de Login', () => {
  const fetchApiReturn =  {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "ab9a62ca73cd2297b1649e666914a97b639bba4c3defdee931346fca4cc51dbc"
  };

  it('deve exibir dois inputs na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const inputs =screen.getAllByRole('textbox');
    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);

    expect(inputs).toHaveLength(2);
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  it('deve conter dois botões na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const buttons =screen.getAllByRole('button');
    const playButton = screen.getByRole('button', { name: /play/i })
    const settingsButton = screen.getByRole('button', { name: /configurações/i })

    expect(buttons).toHaveLength(2);
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('deve habilitar o botão "Play" ao passar um email e username corretos', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    const playButton = screen.getByText(/play/i);
    
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputEmail, 'exemplo@hotmail.com');
    userEvent.type(inputName, 'João Sem-braço');

    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeEnabled();
  });

  it('deve ser redirecionada à página de jogo ao clicar em Play', () => {
    const { history } = renderWithRouterAndRedux(<Login />, INITIAL_STATE, '/game');

    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    const playButton = screen.getByText(/play/i);
    
    userEvent.type(inputEmail, 'exemplo@hotmail.com');
    userEvent.type(inputName, 'João Sem-braço');
    userEvent.click(playButton);

    expect(history.location.pathname).toBe('/game');
  });

  it('Teste se a função fecth é chamada', () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: () => fetchApiReturn,
      });
  
    renderWithRouterAndRedux(<Login />);
  
    const inputEmail = screen.getByPlaceholderText(/exemplo@hotmail.com/i);
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    const playButton = screen.getByText(/play/i);
    
    userEvent.type(inputEmail, 'exemplo@hotmail.com');
    userEvent.type(inputName, 'João Sem-braço');
    userEvent.click(playButton);

    expect(aboutText).toHaveValue('exemplo@hotmail.com');
    expect(aboutEmail).toHaveValue('João Sem-braço')
    userEvent.click(playButton);
  
    waitForElementToBeRemoved(inputName).then(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    })
  });
})
