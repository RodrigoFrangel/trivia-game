import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const {
      showQuestions,
      question,
      category,
      correctAnswer,
      allAnswers,
      isEnabled,
    } = this.props;

    return (
      <div className="trivia-question">
        <div className="question-container">
          <p
            data-testid="question-category"
            className="question-category"
          >
            {category}
          </p>
          <p
            data-testid="question-text"
            className="question-text"
          >
            {question}
          </p>
        </div>
        <div data-testid="answer-options" className="answer-container">
          {allAnswers.map((answer, index) => (
            answer !== correctAnswer
              ? (
                <button
                  className={ isEnabled ? 'wrong-answer' : '' }
                  key={ answer }
                  type="button"
                  name="wrong"
                  onClick={ showQuestions }
                  data-testid={ `wrong-answer-${index}` }
                  disabled={ isEnabled }
                >
                  {answer}
                </button>
              )
              : (
                <button
                  className={ isEnabled ? 'correct-answer' : '' }
                  name={ correctAnswer }
                  key={ answer }
                  type="button"
                  onClick={ showQuestions }
                  data-testid="correct-answer"
                  disabled={ isEnabled }
                >
                  {answer}
                </button>
              )
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  showQuestions: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  allAnswers: PropTypes.instanceOf(Array).isRequired,
  isEnabled: PropTypes.bool.isRequired,
};

export default Question;
