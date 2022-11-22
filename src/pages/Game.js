import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { sendQuestions, sendScore } from '../redux/actions';
import ButtonNext from '../components/ButtonNext';

class Game extends React.Component {
  state = {
    currentQuestion: 0,
    category: '',
    question: '',
    correctAnswer: '',
    timer: 30,
    difficulty: '',
    allQuestions: [],
    allAnswers: [],
    isEnabled: true,
    isBtnNextShowing: false,
    isTimerShowing: false,
  };

  componentDidMount = async () => {
    this.timerCountdown();
    await this.fetchQuestionsFromAPI();
    this.setState({ isTimerShowing: true });
  }

  componentDidUpdate = async () => {
    const { timer } = this.state;
    const timesUp = 0;
    if (timer === timesUp) {
      this.resetTimer();
      this.showBtnNext();
    }
  }

  playerGravatar = () => {
    const { getEmail } = this.props;
    const convertedEmail = md5(getEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${convertedEmail}`;
    return gravatar;
  };

  setResponseApiState = (question) => {
    const RESPONSE_CODE = 3;
    const randomNum = 0.5;
    const { history } = this.props;
    if (question.results.length === 0 || question.response_code === RESPONSE_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        currentQuestion: 0,
        allQuestions: question.results,
        category: question.results[0].category,
        question: question.results[0].question,
        correctAnswer: question.results[0].correct_answer,
        difficulty: question.results[0].difficulty,
        allAnswers: question.results[0]
          .incorrect_answers.concat(question.results[0].correct_answer)
          .sort(() => Math.random() - randomNum),
      });
    }
  }

  fetchQuestionsFromAPI = async () => {
    const token = localStorage.getItem('token');
    const numberOfQuestions = 5;
    const questionsAPI = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`,
    );
    const questions = await questionsAPI.json();
    return this.setResponseApiState(questions);
  };

  timerCountdown = () => {
    const ONE_SECOND = 1000;
    this.idTimer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetTimer = () => {
    clearInterval(this.idTimer);
    this.setState({
      timer: 30,
      isEnabled: false,
      isTimerShowing: true,
    });
  };

  showBtnNext = () => {
    this.setState({
      isBtnNextShowing: true,
      isTimerShowing: false,
    });
  }

  showQuestions = (event) => {
    const { correctAnswer, isBtnNextShowing } = this.state;
    const { setQuestions, getAssertions } = this.props;
    const { name } = event.target;
    if (name === correctAnswer) {
      this.playerScore();
      this.resetTimer();
      setQuestions(getAssertions);
    } else if (name !== correctAnswer) {
      this.resetTimer();
    }
    this.setState({
      isBtnNextShowing: !isBtnNextShowing,
    });
  };

  playerScore = () => {
    const { setScore, getScore } = this.props;
    const { timer, difficulty } = this.state;
    const defaultPoints = 10;
    const level = { easy: 1, medium: 2, hard: 3 };
    const totalScore = getScore + (defaultPoints + (timer * level[difficulty]));
    setScore(totalScore);
  };

  nextQuestion = (event) => {
    const { currentQuestion, allQuestions } = this.state;
    const randomNum = 0.5;
    const next = currentQuestion + 1;
    const lastQuestion = allQuestions.length === next;
    this.showQuestions(event);
    if (lastQuestion) {
      this.goToFeedback();
    } else {
      this.setState({
        currentQuestion: next,
        category: allQuestions[next].category,
        question: allQuestions[next].question,
        correctAnswer: allQuestions[next].correct_answer,
        difficulty: allQuestions[next].difficulty,
        allAnswers: allQuestions[next].incorrect_answers.concat(
          allQuestions[next].correct_answer,
        ).sort(() => Math.random() - randomNum),
        isEnabled: true,
      });
      this.timerCountdown();
    }
  };

  goToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { getName, getScore } = this.props;
    const {
      timer,
      category,
      question,
      correctAnswer,
      allAnswers,
      isEnabled,
      isBtnNextShowing,
      isTimerShowing,
    } = this.state;

    return (
      <div className="trivia-container">
        <div className="trivia-header">
          {isTimerShowing && <h4 className="timer">{timer}</h4>}
          {isBtnNextShowing
            && <ButtonNext
              nextQuestion={ this.nextQuestion }
              className="button-next"
            />}
        </div>
        <header className="player-header">
          <img
            data-testid="header-profile-picture"
            className="profile-picture"
            src={ this.playerGravatar() }
            alt={ getName }
          />
          <p data-testid="header-player-name">{getName}</p>
          <p data-testid="header-score">
            Score:
            {' '}
            {getScore}
          </p>
        </header>
        <div>
          <Question
            category={ category }
            question={ question }
            correctAnswer={ correctAnswer }
            allAnswers={ allAnswers }
            nextQuestion={ this.nextQuestion }
            isEnabled={ !isEnabled }
            showQuestions={ this.showQuestions }
          />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getAssertions: PropTypes.number.isRequired,
  setQuestions: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
  getAssertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (totalScore) => dispatch(sendScore(totalScore)),
  setQuestions: (questions) => dispatch(sendQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
