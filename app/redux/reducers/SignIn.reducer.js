import {SignInAction} from '../actions/index.actions';

const defaultState = {
  email: '',
  password: '',
  emailAccessbility: true,
  passwordVisibility: true
};

const content = (state = defaultState, action) => {
  switch (action.type) {
  case SignInAction.SET_EMAIL: {
    return {...state, email: action.payload};
  }
  case SignInAction.SET_PASSWORD: {
    return {...state, password: action.payload};
  }
  case SignInAction.SET_EMAIL_ACCESSIBILITY: {
    return {...state, emailAccessbility: action.payload};
  }
  case SignInAction.SET_PASSWORD_VISIBILITY: {
    return {...state, passwordVisibility: action.payload};
  }
  default:
    return state;
  }
};

export default content;