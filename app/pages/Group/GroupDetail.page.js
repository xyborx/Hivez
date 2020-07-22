import React, {useCallback, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import GroupDetail from '../../components/Group/GroupDetail.component';
import {get} from '../../utils/api.utils';

const GroupDetailPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [showBalance, setShowBalance] = useState(false);
	const [requestList, setRequestList] = useState([]);
	const [billList, setBillList] = useState([]);

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeGroupData(groupID, userData.id);
				const requests = await get(`/requests/${groupID}/lists`);
				setRequestList(requests['output_schema'].map(item => {
					return {
						id: item[`request_id`],
						name: item[`request_description`],
						date: item[`created_date`],
						approver: item[`approver_name`],
						image: item[`requester_picture`],
						type: item[`request_type`],
						value: item[`request_amount`],
						status: item[`approval_status`] === '' ? 'ON_PROGRESS' : item[`approval_status`]
					}
				}));
				const bills = await get(`/bills/${groupID}/lists`);
				setBillList(bills['output_schema'].map(item => {
					return {
						id: item[`bill_payment_id`],
						name: item[`bill_description`],
						date: item[`created_date`],
						approver: item[`approver_name`],
						image: item[`requester_picture`],
						type: item[`bill_type`],
						value: item[`bill_amount`],
						status: item[`approval_status`] === '' ? 'ON_PROGRESS' : item[`approval_status`]
					}
				}));
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

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
			groupDetail={groupData}
			showBalance={showBalance}
			requestList={requestList}
			billList={billList}
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