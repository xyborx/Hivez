import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDimensions} from '@react-native-community/hooks'
import Drawer from '../components/Drawer/GroupDrawer.component';
import CreateGroupRequestPage from '../pages/Group/CreateGroupRequest.page';
import GroupBillCreationListPage from '../pages/Group/GroupBillCreationList.page';
import GroupBillListPage from '../pages/Group/GroupBillList.page';
import GroupRequestListPage from '../pages/Group/GroupRequestList.page';
import GroupDetailPage from '../pages/Group/GroupDetail.page';
import GroupReportPage from '../pages/Group/GroupReport.page';
import GroupSettingsPage from '../pages/Group/GroupSettings.page';
import InviteGroupMemberPage from '../pages/Group/InviteGroupMember.page';
import JoinGroupApprovalListPage from '../pages/Group/JoinGroupApprovalList.page';

const GroupDetailNavigation = createDrawerNavigator();

const GroupDrawer = () => {
	const {width} = useDimensions().window;
	return (
		<GroupDetailNavigation.Navigator
			drawerContent={props => <Drawer {...props} />}
			edgeWidth={width}
			initialRouteName='GroupDetail'>
			<GroupDetailNavigation.Screen name='GroupDetail' component={GroupDetailPage} options={{
				icon: 'users',
				text: 'DASHBOARD'
			}} />
			<GroupDetailNavigation.Screen name='CreateGroupRequest' component={CreateGroupRequestPage} options={{
				icon: 'hand-holding-usd',
				text: 'CREATE_REQUEST'
			}} />
			<GroupDetailNavigation.Screen name='GroupRequestApprovalList' component={GroupRequestListPage} options={{
				icon: 'tasks',
				text: 'REQUEST_APPROVAL_LIST'
			}} />
			<GroupDetailNavigation.Screen name='GroupBillList' component={GroupBillListPage} options={{
				icon: 'receipt',
				text: 'PAY_BILL'
			}} />
			<GroupDetailNavigation.Screen name='GroupBillPaymentApprovalList' component={GroupBillListPage} options={{
				icon: 'vote-yea',
				text: 'BILL_PAYMENT_APPROVAL_LIST'
			}} />
			<GroupDetailNavigation.Screen name='GroupBillCreationList' component={GroupBillCreationListPage} options={{
				icon: 'receipt',
				text: 'BILL_CREATION_APPROVAL_LIST'
			}} />
			<GroupDetailNavigation.Screen name='GroupReport' component={GroupReportPage} options={{
				icon: 'file-invoice-dollar',
				text: 'VIEW_REPORT'
			}} />
			<GroupDetailNavigation.Screen name='JoinGroupApprovalList' component={JoinGroupApprovalListPage} options={{
				icon: 'user-check',
				text: 'JOIN_APPROVAL_LIST'
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