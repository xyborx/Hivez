import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillDetail from '../../components/Group/GroupBillDetail.component';
import {get} from '../../utils/api.utils';

const GroupBillDetailPage = ({route, navigation}) => {
	const {billPaymentID, groupID} = route.params;
	console.log(billPaymentID)

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
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

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const billData = await get(`/bills/payments/${billPaymentID}/detail`);
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
		};
		fetchData();
	}, []);

	const approveBillPayment = () => {
		navigation.pop();
		alert(`Approve bill: ${billPaymentID}`);
	};

	const rejectBillPayment = () => {
		navigation.pop();
		alert(`Reject bill: ${billPaymentID}`);
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillDetail
			contentText={translations['GroupBillDetail']}
			groupDetail={groupDetail}
			billDetail={billDetail}
			confirmApproveText={translations['ConfirmApproveGroupBillPayment']}
			confirmRejectText={translations['ConfirmRejectGroupBillPayment']}
			approveBillPayment={approveBillPayment}
			rejectBillPayment={rejectBillPayment}
			goBack={goBack} />
	);
};

export default GroupBillDetailPage;