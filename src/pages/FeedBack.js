import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
    hashEmail = () => {
      const { getEmail } = this.props;
      const emailConvertido = md5(getEmail).toString();
      const gravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
      return gravatar;
    };

    render() {
      const { getName, getScore } = this.props;
      return (
        <header>
          <img
            data-testid="header-profile-picture"
            alt="profile-pic"
            src={ this.hashEmail() }
          />
          <div data-testid="header-player-name">
            { getName }
          </div>
          <div data-testid="header-score">{getScore}</div>
          <p data-testid="feedback-text" />
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
});

Feedback.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};
// talvez fazer mapsstateprops?
export default connect(mapStateToProps)(Feedback);
