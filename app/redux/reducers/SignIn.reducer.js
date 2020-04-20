import {SET_EMAIL, SET_PASSWORD} from '../actions/index.actions';

const defaultState = {
  email: '',
  password: ''
};

const content = (state = defaultState, action) => {
  switch (action.type) {
  case SET_EMAIL: {
    return {...state, email: action.payload};
  }
  case SET_PASSWORD: {
    return {...state, password: action.payload};
  }
  default:
    return state;
  }
};

export default content;