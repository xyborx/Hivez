import React, {useContext, useRef, useState, useCallback} from 'react';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../contexts/language.context';
import {SpinnerContext} from '../contexts/spinner.context';
import {UserContext} from '../contexts/user.context';
import {isToday, isBetweenLastWeek} from '../utils/date.utils';
import {leftExcludingJoin, where} from '../utils/query.utils';
import Notification from '../components/Notification/Notification.component';
import {get} from '../utils/api.utils';

const NotificationPage = ({navigation}) => {
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const [notificationList, setNotificationList] = useState([]);

	const timeRangeHistory = [{
		type: 'TODAY',
		function: isToday
	}, {
		type: 'LAST_SEVEN_DAYS',
		function: isBetweenLastWeek
	}, {
		type: 'LAST_THIRTY_DAYS',
		function: () => true
	}];

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					const notifications = await get(`/notifications/${userData.id}`);
					let notificationData = notifications['output_schema'].map(item => {
						return {
							id: item['notification_id'],
							date: item['notification_date'],
							title: item['notification_type'],
							detail: item['description'],
							source: item['source_type'],
							sourceID: item['source_id'],
							sourceImage: item['source_picture'],
							sourceName: item['source_name']
						}
					});
					setNotificationList(
						timeRangeHistory.map((item) => {
							const data = where(notificationData, 'date', item.function);
							notificationData = leftExcludingJoin(notificationData, data, 'id');
							return {
								title: item.type,
								data: data
							};
						})
					);
				} catch (error) {
					console.log(error);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	// "CREATE_GROUP"
	// "REQUEST_APPROVED"
	// "CHANGED_ROLE"
	// "CREATE_EVENT"
	// "REQUEST_REJECTED"

	const navigateToGroup = (groupID) => {
		navigation.navigate('GroupTab', {
			screen: 'GroupDrawer',
			initial: true,
			params: {
				screen: 'GroupDetail',
				initial: true,
				params: {groupID: groupID}
			}
		});
	};

	const navigateToEvent = (eventID) => {
		navigation.navigate('EventTab', {
			screen: 'EventDrawer',
			initial: true,
			params: {
				screen: 'EventDetail',
				initial: true,
				params: {eventID: eventID}
			}
		});
	};

	const navigateToGroupRequestDetail = (requestID) => {
		navigation.navigate('GroupTab', {
			screen: 'GroupRequestDetail',
			initial: true,
			params: {requestID: requestID}
		});
	};

	const navigateToEventRequestDetail = (requestID) => {
		navigation.navigate('EventTab', {
			screen: 'EventRequestDetail',
			initial: true,
			params: {requestID: requestID}
		});
	};

	const navigateToGroupBillDetail = (billID) => {
		navigation.navigate('GroupTab', {
			screen: 'GroupBillDetail',
			initial: true,
			params: {billID: billID}
		});
	};

	const navigateToGroupBillApproval = (billID) => {
		navigation.navigate('GroupTab', {
			screen: 'GroupBillApproval',
			initial: true,
			params: {billID: billID}
		});
	};

	return (
		<Notification
			scrollRef={scrollRef}
			contentText={translations['NotificationList']}
			notificationList={notificationList}
			onGroupClick={navigateToGroup}
			onEventClick={navigateToEvent}
			onEventRequestDetailClick={navigateToEventRequestDetail}
			onGroupRequestDetailClick={navigateToGroupRequestDetail}
			onGroupBillApprovalClick={navigateToGroupBillApproval}
			onGroupBillDetailClick={navigateToGroupBillDetail} />
	);
};

export default NotificationPage;