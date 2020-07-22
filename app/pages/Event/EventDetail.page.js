import React, {useCallback, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import EventDetail from '../../components/Event/EventDetail.component';
import {get} from '../../utils/api.utils';

const EventDetailPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [requestList, setRequestList] = useState([]);
	const [showTotalExpense, setShowTotalExpense] = useState(false);
	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeEventData(eventID, userData.id);
				const requests = await get(`/requests/${eventID}/lists`);
				setRequestList(requests['output_schema'].map(item => {
					return {
						id: item['request_id'],
						name: item['request_description'],
						date: item[`created_date`],
						approver: item[`approver_name`],
						image: item[`requester_picture`],
						type: item[`request_type`],
						value: item[`request_amount`],
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

	const toggleShowTotalExpense = () => {
		setShowTotalExpense(!showTotalExpense);
	};

	const navigateToCreateEventRequest = () => {
		navigation.navigate('CreateEventRequest', {
			eventID: eventID
		});
	};

	const navigateToViewReport = () => {
		navigation.navigate('EventReport', {
			eventID: eventID
		});
	};

	const navigateToInviteMember = () => {
		navigation.navigate('InviteEventMember', {
			eventID: eventID
		});
	};

	const navigateToEventSettings = () => {
		navigation.navigate('EventSettings', {
			eventID: eventID
		});
	};

	const viewRequestDetail = (requestID) => {
		navigation.navigate('EventRequestDetail', {
			eventID: eventID,
			requestID: requestID
		});
	};

	const goBack = () => {
		navigation.replace('EventList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<EventDetail
			contentText={translations['EventDetail']}
			recentRequestText={translations['RecentEventRequest']}
			eventDetail={eventData}
			showTotalExpense={showTotalExpense}
			toggleShowTotalExpense={toggleShowTotalExpense}
			requestList={requestList}
			navigateToCreateEventRequest={navigateToCreateEventRequest}
			navigateToViewReport={navigateToViewReport}
			navigateToInviteMember={navigateToInviteMember}
			navigateToEventSettings={navigateToEventSettings}
			onRequestDetailClick={viewRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default EventDetailPage;