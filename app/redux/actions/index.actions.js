import {createAction} from 'redux-actions';

export const TEST_ACTION = 'TEST_ACTION';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

export const testAction = createAction(TEST_ACTION);
export const setEmail = createAction(SET_EMAIL);
export const setPassword = createAction(SET_PASSWORD);