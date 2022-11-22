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
    this.setState({ [name]: value }, this.enableButton);
  }

  enableButton = () => {
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

  startGame = async () => {
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

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { inputEmail, inputName, isEnabled } = this.state;

    return (
      <div className="login-container">
        <h3 className="input-title">Name</h3>
        <input
          type="text"
          data-testid="input-player-name"
          className="login-input"
          name="inputName"
          placeholder="Choose your coolest name"
          onChange={ this.handleChange }
          value={ inputName }
        />
        <h3 className="input-title">Email</h3>
        <input
          type="email"
          data-testid="input-gravatar-email"
          className="login-input"
          name="inputEmail"
          placeholder="example@gmail.com"
          onChange={ this.handleChange }
          value={ inputEmail }
        />
        <div className="login-buttons">
          <button
            type="button"
            data-testid="btn-play"
            className="login-button"
            onClick={ this.startGame }
            disabled={ !isEnabled }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="login-button"
            onClick={ this.goToSettings }
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

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
