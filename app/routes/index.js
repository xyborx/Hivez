import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LocalizationProvider} from '../utils/language.utils';

import TabBar from '../components/TabBar/TabBar.component';

import CreateGroupTransactionPage from '../pages/CreateGroupTransaction.page';
import GroupTransactionDetailPage from '../pages/GroupTransactionDetail.page';

import SignInPage from '../pages/SignIn.page';
import SignUpPage from '../pages/SignUp.page';
import ForgotPasswordPage from '../pages/ForgotPassword.page';

import GroupListPage from '../pages/GroupList.page';
import CreateGroupPage from '../pages/CreateGroup.page';
import FindGroupPage from '../pages/FindGroup.page';
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
		<GroupNavigation.Navigator initialRouteName='GroupList' headerMode='none'>
			<GroupNavigation.Screen name='GroupList' component={GroupListPage} />
			<GroupNavigation.Screen name='CreateGroup' component={CreateGroupPage} />
			<GroupNavigation.Screen name='FindGroup' component={FindGroupPage} />
			<GroupNavigation.Screen name='GroupDetail' component={GroupDetailPage} />
		</GroupNavigation.Navigator>
	);
};

const TabNavigation = createBottomTabNavigator();

const AppTabs = () => {
	return (
		<TabNavigation.Navigator
			backBehavior='history'
			initialRouteName='Dashboard'
			tabBar={props => <TabBar {...props} />}>
			<TabNavigation.Screen component={DashboardPage} name='Dashboard' options={{
				icon: 'home',
				text: 'HOME'
			}} />
			<TabNavigation.Screen component={GroupStack} name='GroupTab' options={{
				icon: 'users',
				text: 'GROUP'
			}} />
			<TabNavigation.Screen component={EventListPage} name='Event' options={{
				icon: 'calendar-alt',
				text: 'EVENT'
			}} />
			<TabNavigation.Screen component={NotificationPage} name='Notification' options={{
				icon: 'bell',
				text: 'NOTIFICATION'
			}} />
			<TabNavigation.Screen component={MyProfilePage} name='Profile' options={{
				icon: 'user-alt',
				text: 'PROFILE'
			}} />
		</TabNavigation.Navigator>
	);
};

const RootNavigation = createStackNavigator();

const RootStack = () => {
	return (
		<RootNavigation.Navigator headerMode='none' initialRouteName={'MainStack'}>
			<RootNavigation.Screen component={AppTabs} name='MainStack' />
			<RootNavigation.Screen component={CreateGroupTransactionPage} name='CreateGroupTransaction'/>
			<RootNavigation.Screen component={GroupTransactionDetailPage} name='GroupTransactionDetail'/>
		</RootNavigation.Navigator>
	);
};

export default function Router() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<LocalizationProvider>
					<RootStack />
				</LocalizationProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}