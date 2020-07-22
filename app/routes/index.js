import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserContext} from '../contexts/user.context';
import AppTabs from './AppTabs.route';
import PreSignIn from './PreSignIn.route';

export default function Router({children}) {
	const {userData} = useContext(UserContext);

	return (
		<NavigationContainer>
			<SafeAreaProvider>
				{children}
				{userData ? <AppTabs /> : <PreSignIn />}
			</SafeAreaProvider>
		</NavigationContainer>
	);
};