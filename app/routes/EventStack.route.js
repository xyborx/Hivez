import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateEventPage from '../pages/Event/CreateEvent.page';
import EditEventMemberPage from '../pages/Event/EditEventMember.page';
import FindEventPage from '../pages/Event/FindEvent.page';
import EventDrawer from './EventDrawer.route';
import EventListPage from '../pages/Event/EventList.page';
import EventRequestDetailPage from '../pages/Event/EventRequestDetail.page';
import SelectRequestPayeePage from '../pages/Event/SelectRequestPayee.page';

const EventNavigation = createStackNavigator();

const EventStack = () => {
	return (
		<EventNavigation.Navigator initialRouteName='EventList' headerMode='none'>
			<EventNavigation.Screen component={CreateEventPage} name='CreateEvent' />
			<EventNavigation.Screen component={EditEventMemberPage} name='EditEventMember'/>
			<EventNavigation.Screen component={FindEventPage} name='FindEvent' />
			<EventNavigation.Screen component={EventDrawer} name='EventDrawer' />
			<EventNavigation.Screen component={EventListPage} name='EventList' />
			<EventNavigation.Screen component={EventRequestDetailPage} name='EventRequestDetail'/>
			<EventNavigation.Screen component={SelectRequestPayeePage} name='SelectRequestPayee'/>
		</EventNavigation.Navigator>
	);
};

export default EventStack;