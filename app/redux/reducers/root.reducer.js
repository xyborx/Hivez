import {combineReducers} from 'redux';
import test from './test.reducer';
import SignIn from './SignIn.reducer';

export default combineReducers({
	test,
	SignIn
});