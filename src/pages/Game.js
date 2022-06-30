import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { sendScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    questionIndex: 0,
    allQuestions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswer: [],
    isChecked: false,
    currentTimer: 30,
    difficulty: '',
  };

  componentDidMount = async () => {
    this.updateCurrentTimer();
    await this.fetchApiQuestions();
  }

  componentDidUpdate = async () => {
    const endCounter = 0;
    const { currentTimer } = this.state;
    if (currentTimer === endCounter) {
      this.clearCount();
    }
  }

  updateCurrentTimer = () => {
    const oneSeconds = 1000;
    this.idTimer = setInterval(() => {
      this.setState((prevState) => ({
        currentTimer: prevState.currentTimer - 1,
      }));
    }, oneSeconds);
  }

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
    const randNumber = 0.5;
    const RESPONSE_CODE = 3;
    const { history } = this.props;
    if (param.results.length === 0 || param.response_code === RESPONSE_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        questionIndex: 0,
        allQuestions: param.results,
        category: param.results[0].category,
        question: param.results[0].question,
        correctAnswer: param.results[0].correct_answer,
        difficulty: param.results[0].difficulty,
        allAnswer: param.results[0]
          .incorrect_answers.concat(param.results[0].correct_answer)
          .sort(() => Math.random() - randNumber),
      });
    }
  }

  redirectPages = () => {
    const { history } = this.props;
    history.push('/'); // MUDAR PARA A ROTA CORRETA
  };

  clearCount = () => {
    clearInterval(this.idTimer);
    this.setState({ currentTimer: 30, isChecked: true });
  };

  waitQuestion = (event) => {
    const { correctAnswer } = this.state;
    const { name } = event.target;
    if (name === correctAnswer) {
      this.scorePlayer();
      this.clearCount();
    } else if (name !== correctAnswer) {
      this.clearCount();
    }
  };

  questionNext = (event) => {
    const { questionIndex, allQuestions } = this.state;
    const nextIndex = questionIndex + 1;
    const lastElement = allQuestions.length === nextIndex;
    this.waitQuestion(event);
    if (lastElement) {
      this.redirectPages();
    } else {
      this.setState({
        questionIndex: nextIndex,
        category: allQuestions[nextIndex].category,
        question: allQuestions[nextIndex].question,
        correctAnswer: allQuestions[nextIndex].correct_answer,
        difficulty: allQuestions[nextIndex].difficulty,
        allAnswer: allQuestions[nextIndex].incorrect_answers.concat(
          allQuestions[nextIndex].correct_answer,
        ),
        isChecked: false,
      });
      this.updateCurrentTimer();
    }
  };

  scorePlayer = () => {
    const { setScore, getScore } = this.props;
    const { currentTimer, difficulty } = this.state;
    const defaultNumber = 10;
    const pontuation = { easy: 1, medium: 2, hard: 3 };
    const sum = getScore + (defaultNumber + (currentTimer * pontuation[difficulty]));
    setScore(sum);
  };

  render() {
    const { getName, getScore } = this.props;
    const {
      category,
      question,
      correctAnswer,
      allAnswer,
      isChecked,
      currentTimer,
    } = this.state;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.hashEmail() }
            alt={ getName }
          />
          <p data-testid="header-player-name">{getName}</p>
          <p data-testid="header-score">{getScore}</p>
        </header>
        <div>
          <Question
            category={ category }
            question={ question }
            correctAnswer={ correctAnswer }
            allAnswer={ allAnswer }
            questionNext={ this.questionNext }
            isChecked={ isChecked }
            waitQuestion={ this.waitQuestion }
          />
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.questionNext }
          >
            Next
          </button>
        </div>
        <h3>
          Seu tempo para responder a pergunta acaba em:
          {' '}
          {currentTimer}
        </h3>
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
  getScore: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.player.gravatarEmail,
  getName: state.player.name,
  getScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (sum) => dispatch(sendScore(sum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
