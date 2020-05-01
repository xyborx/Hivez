import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';
import DashboardPage from '../pages/Dashboard.page';
import GroupListPage from '../pages/GroupList.page';
import SignInPage from '../pages/SignIn.page';
import SignUpPage from '../pages/SignUp.page';
import ForgotPasswordPage from '../pages/ForgotPassword.page';

const AppNavigation = createStackNavigator();

const TabNavigation = createBottomTabNavigator();

function MyTabs() {
	return (
		<TabNavigation.Navigator
			backBehavior='history'
			initialRouteName='GroupList' >
			<TabNavigation.Screen name="Dashboard" component={DashboardPage} />
			<TabNavigation.Screen name="GroupList" component={GroupListPage} />
			<TabNavigation.Screen name="SignIn" component={SignInPage} />
			<TabNavigation.Screen name="SignUp" component={SignUpPage} />
			<TabNavigation.Screen name="ForgotPassword" component={ForgotPasswordPage} />
		</TabNavigation.Navigator>
	);
}

export default function Router() {
    return (
        <NavigationContainer>
			<SafeAreaProvider>
				<LocalizationProvider>
					<MyTabs />
					{/* <AppNavigation.Navigator initialRouteName='SignIn' headerMode='none'>
						<AppNavigation.Screen name='SignIn' component={SignInPage}/>
						<AppNavigation.Screen name='SignUp' component={SignUpPage}/>
						<AppNavigation.Screen name='ForgotPassword' component={ForgotPasswordPage}/>
					</AppNavigation.Navigator> */}
				</LocalizationProvider>
			</SafeAreaProvider>
        </NavigationContainer>
    );
}