import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import EventDetail from '../../components/Event/EventDetail.component';
import {get} from '../../utils/api.utils';

const EventDetailPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);

	const [eventDetail, setEventDetail] = useState({
		id: eventID,
		image: '',
		name: '',
		description: '',
		totalExpense: 0
	});
	const [requestList, setRequestList] = useState([]);
	const [showTotalExpense, setShowTotalExpense] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await get(`/events/${eventID}/detail`);
				const image = await get(`/events/${eventID}/picture`);
				setEventDetail({
					id: eventID,
					image: image['output_schema']['event_picture'],
					name: data['output_schema']['event_name'],
					description: data['output_schema']['event_description'],
					totalExpense: data['output_schema']['total_expense']
				});
				const requests = await get(`/requests/${eventID}/lists`);
				setRequestList(requests['output_schema'].map(item => {
					return {
						id: item['request_id'],
						name: item['request_description'],
						date: item['request_date'],
						approver: item['approver_name'],
						image: item['user_picture'],
						value: item['request_amount'],
						status: item['approval_status'] === '' ? 'ON_PROGRESS' : item['approval_status']
					}
				}));
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

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
			eventDetail={eventDetail}
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