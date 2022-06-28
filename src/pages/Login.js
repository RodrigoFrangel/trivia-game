import React from 'react';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputName: '',
    isEnabled: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.habilitaBotao);
  }

  habilitaBotao = () => {
    const { inputName, inputEmail } = this.state;
    const minCharacters = 1;
    const regex = /\S+@\S+\.\S+/;
    if (inputName.length >= minCharacters
      && regex.test(inputEmail)) {
      this.setState({ isEnabled: true });
    } else {
      this.setState({ isEnabled: false });
    }
  }

  // handleClick = () => {
  //   const { history, loginEmail } = this.props;
  //   const { inputEmail } = this.state;
  //   history.push('/');
  //   loginEmail(inputEmail);
  // }

  render() {
    const { isEnabled, inputEmail, inputName } = this.state;

    return (
      <div>
        <h1>Email</h1>
        <input
          name="inputEmail"
          data-testid="input-gravatar-email"
          type="email"
          placeholder="exemplo@hotmail.com"
          onChange={ this.handleChange }
          value={ inputEmail }
        />
        <h2>Nome</h2>
        <input
          name="inputName"
          data-testid="input-player-name"
          type="text"
          placeholder="Seu nome"
          onChange={ this.handleChange }
          value={ inputName }
        />
        <button
          data-testid="btn-play"
          type="button"
          // onClick={ this.handleClick }
          disabled={ !isEnabled }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
