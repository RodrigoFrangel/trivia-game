import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const {
      question,
      allAnswer,
      category,
      nextQuestion,
      correctAnswer,
      isChecked,
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
                  onClick={ nextQuestion }
                  data-testid={ `wrong-answer-${index}` }
                >
                  {answear}
                </button>
              )
              : (
                <button
                  className={ isChecked ? 'correct-answer' : '' }
                  key={ answear }
                  type="button"
                  onClick={ nextQuestion }
                  data-testid="correct-answer"
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
  nextQuestion: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default Question;
