import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillApproval from '../../components/Group/GroupBillApproval.component';
import {get, put} from '../../utils/api.utils';

const GroupBillApprovalPage = ({route, navigation}) => {
	const {billID, groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [billDetail, setBillDetail] = useState({
		id: '',
		value: 0,
		description: '',
		status: '',
		creator: '',
		creationDate: '',
		creationTime: '',
		approver: '',
		approvalDate: '',
		approvalTime: ''
	});

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					await initializeGroupData(groupID, userData.id);
					const billData = await get(`/bills/${billID}/detail`);
					console.log(billData);
					setBillDetail({
						id: billData['output_schema']['bill_id'],
						value: rupiahFormatting(billData['output_schema']['bill_amount']),
						description: billData['output_schema']['bill_description'],
						status: billData['output_schema']['approval_status'] === '' ? 'ON_PROGRESS' : billData['output_schema']['approval_status'],
						creator: billData['output_schema']['creator_name'],
						creationDate: dateToString(billData['output_schema']['creation_date']),
						creationTime: timeToString(billData['output_schema']['creation_date']),
						approver: billData['output_schema']['approver_name'],
						approvalDate: dateToString(billData['output_schema']['approval_date']),
						approvalTime: timeToString(billData['output_schema']['approval_date']),
					});
				} catch (error) {
					console.log(error.stack);
				};
			};
			fetchData();
		}, [])
	);

	const updateBillCreationApproval = async (approvalStatus) => {
		showSpinner();
		try {
			const body = {
				'approver_user_id': userData.id,
				'approval_status': approvalStatus
			};
			const result = await put(`/bills/${billID}/approval`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') navigation.replace('GroupDetail');
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const approveGroupBill = () => {
		updateBillCreationApproval('APPROVED');
	};

	const rejectGroupBill = () => {
		updateBillCreationApproval('REJECTED');
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillApproval
			contentText={translations['GroupBillApproval']}
			groupDetail={groupData}
			billDetail={billDetail}
			confirmApproveText={translations['ConfirmApproveGroupBillCreation']}
			confirmRejectText={translations['ConfirmRejectGroupBillCreation']}
			approveGroupBill={approveGroupBill}
			rejectGroupBill={rejectGroupBill}
			goBack={goBack} />
	);
};

export default GroupBillApprovalPage;