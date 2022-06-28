import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  string: '',
};

const reducerGenerico = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
  default:
    return state;
  }
};

export default reducerGenerico;
