import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetAssertionsScore } from '../redux/actions';

class Feedback extends Component {
  state = {
    gravatarUrl: '',
  }

  componentDidMount = () => {
    this.playerGravatar();
  }

  playerGravatar = () => {
    const { getEmail } = this.props;
    const convertedEmail = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({ gravatarUrl: gravatar },
      () => this.saveDataOnLocalStorage());
  }

  goToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  };

  goToRanking = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/ranking');
  };

  saveDataOnLocalStorage = () => {
    const { getName, getScore } = this.props;
    const leaderboard = {
      name: getName,
      score: getScore,
    };
    const allPlayers = JSON.parse(localStorage.getItem('players'));
    if (allPlayers) {
      allPlayers.push(leaderboard);
      localStorage.setItem('players', JSON.stringify(allPlayers));
    } else {
      localStorage.setItem('players', JSON.stringify([leaderboard]));
    }
  };

  render() {
    const { gravatarUrl } = this.state;
    const { getName, getScore, getAssertions } = this.props;
    const assertionsParam = 3;

    return (
      <div className="feedback-page">
        <header className="player-header">
          <img
            data-testid="header-profile-picture"
            className="profile-picture"
            alt="profile-pic"
            src={ gravatarUrl }
          />
          <div data-testid="header-player-name">
            { getName }
          </div>
          <div data-testid="header-score">
            Score:
            {' '}
            {getScore}
          </div>
        </header>
        <div className="feedback-container">
          <p data-testid="feedback-total-question">
            Correct answers:
            {' '}
            {getAssertions}
          </p>
          <p data-testid="feedback-total-score">
            Final score:
            {' '}
            {getScore}
          </p>
          {getAssertions < assertionsParam
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>}
          <div className="feedback-buttons">
            <button
              onClick={ this.goToLogin }
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
            <button
              onClick={ this.goToRanking }
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
  getAssertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetAssertionsScore()),
});

Feedback.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
