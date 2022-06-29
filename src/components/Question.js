import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { question, allAnswers, category, nextQuestion, correctAnswer } = this.props;
    return (
      <>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {allAnswers.map((answear, index) => (
            answear !== correctAnswer
              ? (
                <button
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
  allAnswers: PropTypes.instanceOf(Array).isRequired,
  nextQuestion: PropTypes.func.isRequired,

};

export default Question;
