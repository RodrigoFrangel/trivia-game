import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';

class Game extends React.Component {
  state = {
    questionIndex: 0,
    allQuestions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswer: [],
    isChecked: false,
  };

  hashEmail = () => {
    const { getEmail } = this.props;
    const emailConvertido = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
    return gravatar;
  };

    fetchApiQuestions = async () => {
      const token = localStorage.getItem('token');
      const quantQuestoes = 5;
      const questionsAPI = await fetch(
        `https://opentdb.com/api.php?amount=${quantQuestoes}&token=${token}`,
      );
      const questionsObj = await questionsAPI.json();
      return this.setResponseApiState(questionsObj);
    };

  setResponseApiState = (param) => {
    const { history } = this.props;
    if (param.results.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        questionIndex: 0,
        allQuestions: param.results,
        category: param.results[0].category,
        question: param.results[0].question,
        correctAnswer: param.results[0].correct_answer,
        allAnswer: param.results[0]
          .incorrect_answers.concat(param.results[0].correct_answer) });
    }
  }

  redirectPages = () => {
    const { history } = this.props;
    history.push('/'); // MUDAR PARA A ROTA CORRETA
  }

  rightWrongColor = () => {
    this.setState({ isChecked: true });
    const seconds = 1000;
    setTimeout(this.questionNext, seconds);
  }

  questionNext = () => {
    const { questionIndex, allQuestions } = this.state;
    const nextIndex = questionIndex + 1;
    const lastElement = allQuestions.length === nextIndex;
    if (lastElement) {
      this.redirectPages();
    } else {
      this.rightWrongColor();
      this.setState({
        questionIndex: nextIndex,
        category: allQuestions[nextIndex].category,
        question: allQuestions[nextIndex].question,
        correctAnswer: allQuestions[nextIndex].correct_answer,
        allAnswer: allQuestions[nextIndex]
          .incorrect_answers.concat(allQuestions[nextIndex].correct_answer),
        isChecked: false,
      });
    }
  }

  componentDidMount = async () => {
    await this.fetchApiQuestions();
  };

  render() {
    const { getName } = this.props;
    const {
      category,
      question,
      correctAnswer,
      allAnswer,
      isChecked,
    } = this.state;
    const randNumber = 0.5;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.hashEmail() }
            alt={ getName }
          />
          <p data-testid="header-player-name">{getName}</p>
          <p data-testid="header-score">0.00</p>
        </header>
        <div>
          <Question
            category={ category }
            question={ question }
            correctAnswer={ correctAnswer }
            allAnswer={ allAnswer
              .sort(() => Math.random() - randNumber) }
            nextQuestion={ this.rightWrongColor }
            isChecked={ isChecked }
          />
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
});

export default connect(mapStateToProps)(Game);
