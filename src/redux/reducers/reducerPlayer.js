import { SEND_EMAIL, SEND_NAME } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case SEND_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default player;
