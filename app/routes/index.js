import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';
import SignInPage from '../pages/SignIn.page';
import SignUpPage from '../pages/SignUp.page';

const AppNavigation = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
			<SafeAreaProvider>
				<LocalizationProvider>
					<AppNavigation.Navigator initialRouteName='SignIn' headerMode='none'>
						<AppNavigation.Screen name='SignIn' component={SignInPage}/>
						<AppNavigation.Screen name='SignUp' component={SignUpPage}/>
					</AppNavigation.Navigator>
				</LocalizationProvider>
			</SafeAreaProvider>
        </NavigationContainer>
    );
}