import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  render() {
    const { nextQuestion } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        className="button-next"
        onClick={ nextQuestion }
      >
        Next
      </button>
    );
  }
}

ButtonNext.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};

export default ButtonNext;
