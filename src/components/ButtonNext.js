import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  render() {
    const { funcQuest } = this.props;
    return (
      <button
        className="button-next"
        type="button"
        data-testid="btn-next"
        onClick={ funcQuest }
      >
        Next
      </button>
    );
  }
}

ButtonNext.propTypes = {
  funcQuest: PropTypes.func.isRequired,
};

export default ButtonNext;
