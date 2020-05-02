import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';

import SignInPage from '../pages/SignIn.page';
import SignUpPage from '../pages/SignUp.page';
import ForgotPasswordPage from '../pages/ForgotPassword.page';

import GroupListPage from '../pages/GroupList.page';
import GroupDetailPage from '../pages/GroupDetail.page';

import DashboardPage from '../pages/Dashboard.page';
import EventListPage from '../pages/EventList.page';
import NotificationPage from '../pages/Notification.page';
import MyProfilePage from '../pages/MyProfile.page';

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

const GroupNavigation = createStackNavigator();

const GroupStack = () => {
	return (
		<GroupNavigation.Navigator initialRouteName='GroupDetail' headerMode='none'>
			<GroupNavigation.Screen name='Group' component={GroupListPage} />
			<GroupNavigation.Screen name='GroupDetail' component={GroupDetailPage} />
		</GroupNavigation.Navigator>
	);
};

const TabNavigation = createBottomTabNavigator();

const AppTabs = () => {
	return (
		<TabNavigation.Navigator
			backBehavior='history'
			initialRouteName='Group'>
			<TabNavigation.Screen name='Dashboard' component={DashboardPage} />
			<TabNavigation.Screen name='Group' component={GroupStack} />
			<TabNavigation.Screen name='Event' component={EventListPage} />
			<TabNavigation.Screen name='Notification' component={NotificationPage} />
			<TabNavigation.Screen name='Profile' component={MyProfilePage} />
		</TabNavigation.Navigator>
	);
};

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