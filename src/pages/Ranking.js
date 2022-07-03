import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  state = {
    gravatarUrl: '',
  }

  componentDidMount = () => {
    this.playerGravatar();
  };

  playerGravatar = () => {
    const { getEmail } = this.props;
    const convertedEmail = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({ gravatarUrl: gravatar });
  }

  goToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  getPlayerScores = () => {
    const playerScore = JSON.parse(localStorage.getItem('players'));
    const numberOne = 1;
    const minusOne = -1;
    const zero = 0;
    return playerScore.sort((a, b) => {
      if (a.score > b.score) return minusOne;
      if (a.score < b.score) return numberOne;
      return zero;
    });
  }

  render() {
    const { gravatarUrl } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.getPlayerScores().map((player, index) => (
          <div
            key={ player.name }
            className="player-ranking"
          >
            <img src={ gravatarUrl } alt={ player.name } />
            <span data-testid={ `player-name-${index}` }>{ player.name }</span>
            <span data-testid={ `player-score-${index}` }>
              Score:
              {' '}
              { player.score }
            </span>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          Home
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
