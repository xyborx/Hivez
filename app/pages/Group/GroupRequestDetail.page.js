import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupRequestDetail from '../../components/Group/GroupRequestDetail.component';
import {get, put} from '../../utils/api.utils';

const GroupRequestDetailPage = ({route, navigation}) => {
	const {requestID, groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
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

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));
	
	useEffect(() => {
		const fetchData = async () => {
			try {
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
		};
		fetchData();
	}, []);

	const updateGroupRequestApproval = async (approvalStatus) => {
		try {
			const body = {
				'approver_user_id': '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b',
				'approval_status': approvalStatus
			};
			const result = await put(`/requests/${requestID}/approval`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
	};

	const approveRequest = () => {
		updateGroupRequestApproval('APPROVED').then(() => navigation.pop());
	};

	const rejectRequest = () => {
		updateGroupRequestApproval('REJECTED').then(() => navigation.pop());
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupRequestDetail
			contentText={translations['GroupRequestDetail']}
			groupDetail={groupDetail}
			requestDetail={requestDetail}
			confirmApproveText={translations['ConfirmApproveGroupRequest']}
			confirmRejectText={translations['ConfirmRejectGroupRequest']}
			approveRequest={approveRequest}
			rejectRequest={rejectRequest}
			goBack={goBack} />
	);
};

export default GroupRequestDetailPage;