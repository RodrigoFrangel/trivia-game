import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  hashEmail = () => {
    const { getEmail } = this.props;
    const emailConvertido = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
    return gravatar;
  }

  render() {
    const { getName } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.hashEmail() }
          alt={ getName }
        />
        <p data-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">0.00</p>
      </header>
    );
  }
}

Game.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
});

export default connect(mapStateToProps)(Game);
