import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drawer from '../components/Drawer/GroupDrawer.component';
import CreateGroupTransactionPage from '../pages/Group/CreateGroupTransaction.page';
import GroupBillListPage from '../pages/Group/GroupBillList.page';
import GroupDetailPage from '../pages/Group/GroupDetail.page';
import GroupReportPage from '../pages/Group/GroupReport.page';
import GroupSettingsPage from '../pages/Group/GroupSettings.page';
import InviteGroupMemberPage from '../pages/Group/InviteGroupMember.page';

const GroupDetailNavigation = createDrawerNavigator();

const GroupDrawer = () => {
	return (
		<GroupDetailNavigation.Navigator drawerContent={props => <Drawer {...props} />} drawerType={'slide'} initialRouteName='GroupDetail'>
			<GroupDetailNavigation.Screen name='GroupDetail' component={GroupDetailPage} options={{
				icon: 'users',
				text: 'DASHBOARD'
			}} />
			<GroupDetailNavigation.Screen name='CreateGroupTransaction' component={CreateGroupTransactionPage} options={{
				icon: 'hand-holding-usd',
				text: 'CREATE_REQUEST'
			}} />
			<GroupDetailNavigation.Screen name='GroupBillList' component={GroupBillListPage} options={{
				icon: 'receipt',
				text: 'PAY_BILL'
			}} />
			<GroupDetailNavigation.Screen name='GroupReport' component={GroupReportPage} options={{
				icon: 'file-invoice-dollar',
				text: 'VIEW_REPORT'
			}} />
			<GroupDetailNavigation.Screen name='InviteGroupMember' component={InviteGroupMemberPage} options={{
				icon: 'user-plus',
				text: 'INVITE_MEMBER'
			}} />
			<GroupDetailNavigation.Screen name='GroupSettings' component={GroupSettingsPage} options={{
				icon: 'cogs',
				text: 'GROUP_SETTINGS'
			}} />
		</GroupDetailNavigation.Navigator>
	);
};

export default GroupDrawer;