import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDimensions} from '@react-native-community/hooks'
import Drawer from '../components/Drawer/EventDrawer.component';
import CreateEventRequestPage from '../pages/Event/CreateEventRequest.page';
import EventDetailPage from '../pages/Event/EventDetail.page';
import EventReportPage from '../pages/Event/EventReport.page';
import EventSettingsPage from '../pages/Event/EventSettings.page';
import InviteEventMemberPage from '../pages/Event/InviteEventMember.page';
import JoinEventApprovalListPage from '../pages/Event/JoinEventApprovalList.page';

const EventDetailNavigation = createDrawerNavigator();

const EventDrawer = () => {
	const {width} = useDimensions().window;
	return (
		<EventDetailNavigation.Navigator
			drawerContent={props => <Drawer {...props} />}
			edgeWidth={width}
			initialRouteName='EventDetail'>
			<EventDetailNavigation.Screen name='EventDetail' component={EventDetailPage} options={{
				icon: 'users',
				text: 'DASHBOARD'
			}} />
			<EventDetailNavigation.Screen name='CreateEventRequest' component={CreateEventRequestPage} options={{
				icon: 'hand-holding-usd',
				text: 'CREATE_REQUEST'
			}} />
			<EventDetailNavigation.Screen name='EventRequestApprovalList' component={CreateEventRequestPage} options={{
				icon: 'tasks',
				text: 'REQUEST_APPROVAL_LIST'
			}} />
			<EventDetailNavigation.Screen name='EventReport' component={EventReportPage} options={{
				icon: 'file-invoice-dollar',
				text: 'VIEW_REPORT'
			}} />
			<EventDetailNavigation.Screen name='JoinEventApprovalList' component={JoinEventApprovalListPage} options={{
				icon: 'user-check',
				text: 'JOIN_APPROVAL_LIST'
			}} />
			<EventDetailNavigation.Screen name='InviteEventMember' component={InviteEventMemberPage} options={{
				icon: 'user-plus',
				text: 'INVITE_MEMBER'
			}} />
			<EventDetailNavigation.Screen name='EventSettings' component={EventSettingsPage} options={{
				icon: 'cogs',
				text: 'EVENT_SETTINGS'
			}} />
		</EventDetailNavigation.Navigator>
	);
};

export default EventDrawer;