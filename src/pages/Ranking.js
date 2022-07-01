import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
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
