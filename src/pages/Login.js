import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendToken } from '../redux/actions';

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

  fetchApiToken = () => {
    // const { setToken } = this.props;
    const url = 'https://opentdb.com/api_token.php?command=request';

    const token = fetch(url)
      .then((response) => response.json())
      .then((data) => data.token);
    return token;
    // return setToken(token);
  }

  saveLocalStorage = () => {
    const { getToken } = this.props;
    localStorage.setItem('token', getToken);
  }

  handleClick = async () => {
    const { history } = this.props;
    await fetchApiToken();
    saveLocalStorage();
    history.push('/trivia');
  }

  componentDidMount = () => {
    fetchApiToken();
  }

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(sendToken(token)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  // setToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
