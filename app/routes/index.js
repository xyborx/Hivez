import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';
import SignInPage from '../pages/SignIn.page';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppNavigation = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
			<SafeAreaProvider>
				<LocalizationProvider>
					<AppNavigation.Navigator headerMode="none">
						<AppNavigation.Screen name="signin" component={SignInPage}/>
					</AppNavigation.Navigator>
				</LocalizationProvider>
			</SafeAreaProvider>
        </NavigationContainer>
    );
}