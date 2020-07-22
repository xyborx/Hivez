import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {dateToString, timeToString} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import EventRequestDetail from '../../components/Event/EventRequestDetail.component';
import {get, put} from '../../utils/api.utils';

const EventRequestDetailPage = ({route, navigation}) => {
	const {requestID, eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [requestDetail, setRequestDetail] = useState({
		id: requestID,
		value: '', 
		description: '',
		status: '', 
		requester: '', 
		requestDate: '', 
		requestTime: '', 
		approver: '', 
		approvalDate: '', 
		approvalTime: '', 
		requestImage: '',
		payee: []
	});

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeEventData(eventID, userData.id);
					const requestData = await get(`/requests/${requestID}/detail`);
					setRequestDetail({
							id: requestID,
							value: rupiahFormatting(requestData['output_schema']['request_amount'], false), 
							description: requestData['output_schema']['request_description'],
							status: requestData['output_schema']['approval_status'] === '' ? 'ON_PROGRESS' : requestData['output_schema']['approval_status'], 
							requester: requestData['output_schema']['requester_name'], 
							requestDate: dateToString(requestData['output_schema']['request_date']), 
							requestTime: timeToString(requestData['output_schema']['request_date']),
							approver: requestData['output_schema']['approver_name'], 
							approvalDate: dateToString(requestData['output_schema']['approval_date']), 
							approvalTime: timeToString(requestData['output_schema']['approval_date']), 
							requestImage: requestData['output_schema']['receipt_picture'],
							payee: requestData['output_schema']['request_payee'].map(item => {
								return {
									id: item['user_id'],
									image: item['user_picture'],
									name: item['full_name'],
									role: item['role'],
									username: item['user_name'],
									expense: item['amount']
								}
							})
					});
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const updateEventRequestApproval = async (approvalStatus) => {
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
		updateEventRequestApproval('APPROVED');
	};

	const rejectRequest = () => {
		updateEventRequestApproval('REJECTED');
	};

	const viewPayee = () => {
		navigation.navigate('ViewRequestPayee', {eventID: requestDetail.eventID, payeeList: requestDetail.payee});
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<EventRequestDetail
			contentText={translations['EventRequestDetail']}
			eventDetail={eventData}
			requestDetail={requestDetail}
			confirmApproveText={translations['ConfirmApproveEventRequest']}
			confirmRejectText={translations['ConfirmRejectEventRequest']}
			approveRequest={approveRequest}
			rejectRequest={rejectRequest}
			viewPayee={viewPayee}
			goBack={goBack} />
	);
};

export default EventRequestDetailPage;