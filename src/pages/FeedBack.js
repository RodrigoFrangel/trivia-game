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

    redirectLogin = () => {
      const { history } = this.props;
      history.push('/');
    };

    redirectRanking = () => {
      const { history } = this.props;
      history.push('/ranking');
    };

    render() {
      const { getName, getScore, getAssertions } = this.props;
      const assertionsParam = 3;
      return (
        <>
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
          </header>
          <div>
            <p data-testid="feedback-total-question">{ getAssertions }</p>
            <p data-testid="feedback-total-score">{getScore}</p>
            {getAssertions < assertionsParam
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>}
            <button
              onClick={ this.redirectLogin }
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
            <button
              onClick={ this.redirectRanking }
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </div>
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
  getAssertions: state.player.assertions,
});

Feedback.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
