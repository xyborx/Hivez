import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillApproval from '../../components/Group/GroupBillApproval.component';
import {get, put} from '../../utils/api.utils';

const GroupBillApprovalPage = ({route, navigation}) => {
	const {billID, groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
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

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
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
	}, []);

	const updateBillCreationApproval = async (approvalStatus) => {
		try {
			const body = {
				'approver_user_id': '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b',
				'approval_status': approvalStatus
			};
			const result = await put(`/bills/${billID}/approval`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
	};

	const approveGroupBill = () => {
		updateBillCreationApproval('APPROVED').then(() => navigation.replace('GroupDetail'));
	};

	const rejectGroupBill = () => {
		updateBillCreationApproval('REJECTED').then(() => navigation.replace('GroupDetail'));
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillApproval
			contentText={translations['GroupBillApproval']}
			groupDetail={groupDetail}
			billDetail={billDetail}
			confirmApproveText={translations['ConfirmApproveGroupBillCreation']}
			confirmRejectText={translations['ConfirmRejectGroupBillCreation']}
			approveGroupBill={approveGroupBill}
			rejectGroupBill={rejectGroupBill}
			goBack={goBack} />
	);
};

export default GroupBillApprovalPage;