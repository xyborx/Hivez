import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInPage from '../pages/SignIn.page';
import SignUpPage from '../pages/SignUp.page';
import ForgotPasswordPage from '../pages/ForgotPassword.page';

const PreSignInNavigation = createStackNavigator();

const PreSignInStack = () => {
	return (
		<PreSignInNavigation.Navigator initialRouteName='SignIn' headerMode='none'>
			<PreSignInNavigation.Screen name='SignIn' component={SignInPage}/>
			<PreSignInNavigation.Screen name='SignUp' component={SignUpPage}/>
			<PreSignInNavigation.Screen name='ForgotPassword' component={ForgotPasswordPage}/>
		</PreSignInNavigation.Navigator>
	);
};

export default PreSignInStack;