import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';

class Game extends React.Component {
  state = {
    token: '',
    questionsObj: {},
    questionIndex: 0,
    allQuestions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswers: [],
  };

  hashEmail = () => {
    const { getEmail } = this.props;
    const emailConvertido = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${emailConvertido}`;
    return gravatar;
  };

  getToken = () => {
    const token = localStorage.getItem('token');
    this.setState({ token });
  };

  fetchApiQuestions = async () => {
    const { token } = this.state;
    const quantQuestoes = 5;
    const questionsAPI = await fetch(
      `https://opentdb.com/api.php?amount=${quantQuestoes}&token=${token}`,
    );
    const questionsObj = await questionsAPI.json();
    return this.setState({ questionsObj });
  };

  setResponseApiState = () => {
    const { questionsObj } = this.state;
    const { history } = this.props;
    if (questionsObj.results.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        questionIndex: 0,
        allQuestions: questionsObj.results,
        category: questionsObj.results[0].category,
        question: questionsObj.results[0].question,
        correctAnswer: questionsObj.results[0].correct_answer,
        allAnswers: questionsObj.results[0]
          .incorrect_answers.concat(questionsObj.results[0].correct_answer) });
    }
  }

  redirectPages = () => {
    const { history } = this.props;
    history.push('/');
  }

  questionNext = () => {
    const { questionIndex, allQuestions } = this.state;
    const nextIndex = questionIndex + 1;
    const lastElement = allQuestions.length === nextIndex;
    if (lastElement) {
      this.redirectPages();
    } else {
      this.setState({
        questionIndex: nextIndex,
        category: allQuestions[nextIndex].category,
        question: allQuestions[nextIndex].question,
        correctAnswer: allQuestions[nextIndex].correct_answer,
        allAnswers: allQuestions[nextIndex]
          .incorrect_answers.concat(allQuestions[nextIndex].correct_answer),
      });
    }
  }

  componentDidMount = async () => {
    this.getToken();
    await this.fetchApiQuestions();
    this.setResponseApiState();
  };

  render() {
    const { getName } = this.props;
    const { category, question, correctAnswer, allAnswers } = this.state;
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
            allAnswers={ allAnswers.sort(() => Math.random() - randNumber) }
            nextQuestion={ this.questionNext }
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
