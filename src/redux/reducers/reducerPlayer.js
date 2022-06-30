import { SEND_EMAIL, SEND_NAME, SEND_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
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
  default:
    return state;
  }
};

export default player;
