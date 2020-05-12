import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar/TabBar.component';
import DashboardPage from '../pages/Dashboard.page';
import GroupStack from './GroupStack.route';
import EventStack from './EventStack.route';
import NotificationPage from '../pages/Notification.page';
import MyProfilePage from '../pages/MyProfile.page';

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
			<TabNavigation.Screen component={EventStack} name='Event' options={{
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

export default AppTabs;