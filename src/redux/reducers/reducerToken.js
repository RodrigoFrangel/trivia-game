import { SEND_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const reducerToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default reducerToken;
