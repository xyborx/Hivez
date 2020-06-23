import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';
import AppTabs from './AppTabs.route';
import PreSignIn from './PreSignIn.route';

export default function Router() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<LocalizationProvider>
					<AppTabs />
				</LocalizationProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}