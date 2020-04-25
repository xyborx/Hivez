import {createAction} from 'redux-actions';

export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_EMAIL_ACCESSIBILITY = 'SET_EMAIL_ACCESSIBILITY';
export const SET_PASSWORD_VISIBILITY = 'SET_PASSWORD_VISIBILITY';

export const setEmail = createAction(SET_EMAIL);
export const setPassword = createAction(SET_PASSWORD);
export const setEmailAccessbility = createAction(SET_EMAIL_ACCESSIBILITY);
export const setPasswordVisibility = createAction(SET_PASSWORD_VISIBILITY);