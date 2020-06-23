import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateGroupPage from '../pages/Group/CreateGroup.page';
import CreateGroupBillPage from '../pages/Group/CreateGroupBill.page';
import EditGroupMemberPage from '../pages/Group/EditGroupMember.page';
import FindGroupPage from '../pages/Group/FindGroup.page';
import GroupBillApprovalPage from '../pages/Group/GroupBillApproval.page';
import GroupBillDetailPage from '../pages/Group/GroupBillDetail.page';
import GroupBillPaymentPage from '../pages/Group/GroupBillPayment.page';
import GroupDrawer from './GroupDrawer.route';
import GroupListPage from '../pages/Group/GroupList.page';
import GroupRequestDetailPage from '../pages/Group/GroupRequestDetail.page';
import {GroupProvider} from '../contexts/group.context';

const GroupNavigation = createStackNavigator();

const GroupStack = () => {
	return (
		<GroupProvider>
			<GroupNavigation.Navigator initialRouteName='GroupList' headerMode='none'>
				<GroupNavigation.Screen component={CreateGroupPage} name='CreateGroup' />
				<GroupNavigation.Screen component={CreateGroupBillPage} name='CreateGroupBill'/>
				<GroupNavigation.Screen component={EditGroupMemberPage} name='EditGroupMember'/>
				<GroupNavigation.Screen component={FindGroupPage} name='FindGroup' />
				<GroupNavigation.Screen component={GroupBillApprovalPage} name='GroupBillApproval'/>
				<GroupNavigation.Screen component={GroupBillDetailPage} name='GroupBillDetail'/>
				<GroupNavigation.Screen component={GroupBillPaymentPage} name='GroupBillPayment'/>
				<GroupNavigation.Screen component={GroupDrawer} name='GroupDrawer' />
				<GroupNavigation.Screen component={GroupListPage} name='GroupList' />
				<GroupNavigation.Screen component={GroupRequestDetailPage} name='GroupRequestDetail'/>
			</GroupNavigation.Navigator>
		</GroupProvider>
	);
};

export default GroupStack;