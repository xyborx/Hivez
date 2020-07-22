import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupRequestDetail from '../../components/Group/GroupRequestDetail.component';
import {get, put} from '../../utils/api.utils';

const GroupRequestDetailPage = ({route, navigation}) => {
	const {requestID, groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [requestDetail, setRequestDetail] = useState({
		id: requestID,
		value: '', 
		description: '', 
		type: '', 
		status: '', 
		requester: '', 
		requestDate: '', 
		requestTime: '', 
		approver: '', 
		approvalDate: '', 
		approvalTime: '', 
		requestImage: ''
	});

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeGroupData(groupID, userData.id);
					const requestData = await get(`/requests/${requestID}/detail`);
					setRequestDetail({
							id: requestID,
							value: rupiahFormatting(requestData['output_schema']['request_amount']), 
							description: requestData['output_schema']['request_description'], 
							type: requestData['output_schema']['request_type'], 
							status: requestData['output_schema']['approval_status'] === '' ? 'ON_PROGRESS' : requestData['output_schema']['approval_status'], 
							requester: requestData['output_schema']['requester_name'], 
							requestDate: dateToString(requestData['output_schema']['request_date']), 
							requestTime: timeToString(requestData['output_schema']['request_date']),
							approver: requestData['output_schema']['approver_name'], 
							approvalDate: dateToString(requestData['output_schema']['approval_date']), 
							approvalTime: timeToString(requestData['output_schema']['approval_date']), 
							requestImage: requestData['output_schema']['receipt_picture']
					});
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const updateGroupRequestApproval = async (approvalStatus) => {
		showSpinner();
		try {
			const body = {
				'approver_user_id': userData.id,
				'approval_status': approvalStatus
			};
			const result = await put(`/requests/${requestID}/approval`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') navigation.pop();
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const approveRequest = () => {
		updateGroupRequestApproval('APPROVED');
	};

	const rejectRequest = () => {
		updateGroupRequestApproval('REJECTED');
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupRequestDetail
			contentText={translations['GroupRequestDetail']}
			groupDetail={groupData}
			requestDetail={requestDetail}
			confirmApproveText={translations['ConfirmApproveGroupRequest']}
			confirmRejectText={translations['ConfirmRejectGroupRequest']}
			approveRequest={approveRequest}
			rejectRequest={rejectRequest}
			goBack={goBack} />
	);
};

export default GroupRequestDetailPage;