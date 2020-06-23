import React, {useContext, useState} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import GroupDetail from '../../components/Group/GroupDetail.component';
import {useFocusEffect} from '@react-navigation/native';

const GroupDetailPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: '',
		description: '',
		balance: 0
	});
	const [showBalance, setShowBalance] = useState(false);

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useFocusEffect(() => {
		// 
	});

	const toggleShowBalance = () => {
		setShowBalance(!showBalance);
	};

	const navigateToCreateGroupRequest = () => {
		navigation.navigate('CreateGroupRequest', {
			groupID: groupID
		});
	};

	const navigateToBillPayment = (billPaymentID) => {
		navigation.navigate('GroupBillList', {
			billPaymentID: billPaymentID,
			groupID: groupID
		});
	};

	const navigateToViewReport = () => {
		navigation.navigate('GroupReport', {
			groupID: groupID
		});
	};

	const navigateToInviteMember = () => {
		navigation.navigate('InviteGroupMember', {
			groupID: groupID
		});
	};

	const navigateToGroupSettings = () => {
		navigation.navigate('GroupSettings', {
			groupID: groupID
		});
	};

	const viewBillDetail = (billPaymentID) => {
		navigation.navigate('GroupBillDetail', {
			billPaymentID: billPaymentID,
			groupID: groupID
		});
	};

	const viewRequestDetail = (requestID) => {
		navigation.navigate('GroupRequestDetail', {
			requestID: requestID,
			groupID: groupID
		});
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<GroupDetail
			contentText={translations['GroupDetail']}
			recentBillText={translations['RecentGroupBill']}
			recentRequestText={translations['RecentGroupRequest']}
			groupDetail={groupDetail}
			showBalance={showBalance}
			toggleShowBalance={toggleShowBalance}
			navigateToCreateGroupRequest={navigateToCreateGroupRequest}
			navigateToBillPayment={navigateToBillPayment}
			navigateToViewReport={navigateToViewReport}
			navigateToInviteMember={navigateToInviteMember}
			navigateToGroupSettings={navigateToGroupSettings}
			onBillDetailClick={viewBillDetail}
			onRequestDetailClick={viewRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupDetailPage;