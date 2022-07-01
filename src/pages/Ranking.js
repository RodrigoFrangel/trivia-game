import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  getInfoPlayerLS = () => {
    const playersLS = JSON.parse(localStorage.getItem('players'));
    const numberOne = 1;
    const numberLessOne = -1;
    const numberZero = 0;
    return playersLS.sort((a, b) => {
      if (a.score > b.score) return numberLessOne;
      if (a.score < b.score) return numberOne;
      return numberZero;
    });
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.getInfoPlayerLS().map((el, i) => (
          <div key={ el.name }>
            <img scr={ el.gravatar } alt={ el.name } />
            <p data-testid={ `player-name-${i}` }>{ el.name }</p>
            <p data-testid={ `player-score-${i}` }>{ el.score }</p>
          </div>
        ))}
        <button
          onClick={ this.redirectLogin }
          data-testid="btn-go-home"
          type="button"
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
