import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const {
      question,
      allAnswer,
      category,
      // questionNext,
      correctAnswer,
      isChecked,
      waitQuestion,
    } = this.props;
    return (
      <>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {allAnswer.map((answear, index) => (
            answear !== correctAnswer
              ? (
                <button
                  className={ isChecked ? 'wrong-answer' : '' }
                  key={ answear }
                  type="button"
                  name="wrong"
                  onClick={ waitQuestion }
                  data-testid={ `wrong-answer-${index}` }
                  disabled={ isChecked }
                >
                  {answear}
                </button>
              )
              : (
                <button
                  className={ isChecked ? 'correct-answer' : '' }
                  name={ correctAnswer }
                  key={ answear }
                  type="button"
                  onClick={ waitQuestion }
                  data-testid="correct-answer"
                  disabled={ isChecked }
                >
                  {answear}
                </button>
              )
          ))}
        </div>
      </>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  allAnswer: PropTypes.instanceOf(Array).isRequired,
  // questionNext: PropTypes.func.isRequired,
  waitQuestion: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default Question;
