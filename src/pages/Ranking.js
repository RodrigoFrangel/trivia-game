import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
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
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.getPlayerScores().map((player, index) => (
          <div
            key={ player.name }
            className="player-ranking"
          >
            <img scr={ player.gravatar } alt={ player.name } />
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
};

export default Ranking;
