import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillDetail from '../../components/Group/GroupBillDetail.component';
import {get} from '../../utils/api.utils';

const GroupBillDetailPage = ({route, navigation}) => {
	const {billPaymentID, groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [billDetail, setBillDetail] = useState({
		id: billPaymentID,
		value: 0,
		description: '',
		status: '',
		payer: '',
		paymentDate: '',
		paymentTime: '',
		approver: '',
		approvalDate: '',
		approvalTime: '',
		billImage: ''
	});

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeGroupData(groupID, userData.id);
					const billData = await get(`/bills/${billPaymentID}/approval`);
					setBillDetail({
						id: billData['output_schema']['bill_payment_id'],
						value: rupiahFormatting(billData['output_schema']['bill_amount'], false),
						description: billData['output_schema']['bill_description'],
						status: billData['output_schema']['approval_status'] === '' ? 'ON_PROGRESS' : billData['output_schema']['approval_status'],
						payer: billData['output_schema']['payer_name'],
						paymentDate: dateToString(billData['output_schema']['payment_date']),
						paymentTime: timeToString(billData['output_schema']['payment_date']),
						approver: billData['output_schema']['approver_name'],
						approvalDate: dateToString(billData['output_schema']['approval_date']),
						approvalTime: timeToString(billData['output_schema']['approval_date']),
						billImage: billData['output_schema']['receipt_picture']
					});
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const updateGroupBillPaymentApproval = async (approvalStatus) => {
		showSpinner();
		try {
			const body = {
				'approver_user_id': userData.id,
				'approval_status': approvalStatus
			};
			const result = await put(`/bills/payments/${billPaymentID}/approval`, body);
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

	const approveBillPayment = () => {
		updateGroupBillPaymentApproval('APPROVED');
	};

	const rejectBillPayment = () => {
		updateGroupBillPaymentApproval('REJECTED');
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillDetail
			contentText={translations['GroupBillDetail']}
			groupDetail={groupData}
			billDetail={billDetail}
			confirmApproveText={translations['ConfirmApproveGroupBillPayment']}
			confirmRejectText={translations['ConfirmRejectGroupBillPayment']}
			approveBillPayment={approveBillPayment}
			rejectBillPayment={rejectBillPayment}
			goBack={goBack} />
	);
};

export default GroupBillDetailPage;