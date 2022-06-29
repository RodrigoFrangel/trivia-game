import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail, sendName } from '../redux/actions';

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

  handleClick = async () => {
    const { inputEmail, inputName } = this.state;
    const { history, setEmail, setName } = this.props;
    const tokenAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const userToken = await tokenAPI.json();
    const { token } = userToken;
    localStorage.setItem('token', token);
    setEmail(inputEmail);
    setName(inputName);
    history.push('/game');
  }

  // handleClickSettings = () => {
  //   const { history } = this.props;
  //   history.push('/settings');
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
          onClick={ this.handleClick }
          disabled={ !isEnabled }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          // onClick={ this.handleClickSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   getToken: state.token,
// });

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(sendEmail(email)),
  setName: (name) => dispatch(sendName(name)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
// export default Login;
