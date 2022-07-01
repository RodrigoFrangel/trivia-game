import {
  SEND_EMAIL,
  SEND_NAME,
  SEND_QUESTIONS,
  SEND_SCORE,
  SEND_RESET,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case SEND_NAME:
    return { ...state, name: action.payload };
  case SEND_SCORE:
    return { ...state, score: action.payload };
  case SEND_QUESTIONS:
    return { ...state, assertions: action.payload + 1 };
  case SEND_RESET:
    return { ...state, score: 0, assertions: 0 };
  default:
    return state;
  }
};

export default player;
