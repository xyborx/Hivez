import {createAction} from 'redux-actions';
import * as SignInAction from './SignIn.action';

export const TEST_ACTION = 'TEST_ACTION';

export const testAction = createAction(TEST_ACTION);

module.exports = {
    SignInAction
};