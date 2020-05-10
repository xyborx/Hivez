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
import GroupTransactionDetailPage from '../pages/Group/GroupTransactionDetail.page';

const GroupNavigation = createStackNavigator();

const GroupStack = () => {
	return (
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
			<GroupNavigation.Screen component={GroupTransactionDetailPage} name='GroupTransactionDetail'/>
		</GroupNavigation.Navigator>
	);
};

export default GroupStack;