import React, {useContext, useRef, useState, useEffect} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import {LocalizationContext} from '../utils/language.utils';
import {isToday, isBetweenLastWeek} from '../utils/date.utils';
import {leftExcludingJoin, where} from '../utils/query.utils';
import Notification from '../components/Notification/Notification.component';
import {get} from '../utils/api.utils';

const NotificationPage = ({navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);
	
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await get(`/notifications/${userID}`)['output_schema'].map(item => {
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
						const data = where(notificationListDummy, 'date', item.function);
						notificationListDummy = leftExcludingJoin(notificationListDummy, data, 'id');
						return {
							title: item.type,
							data: data
						};
					})
				);
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	// title: 'JOIN_APPROVED',
	// title: 'JOIN_REJECTED',
	// title: 'REQUEST_APPROVED',
	// title: 'REQUEST_REJECTED',
	// title: 'BILL_CREATION_APPROVED',
	// title: 'BILL_CREATION_REJECTED',
	// title: 'BILL_PAYMENT_APPROVED',
	// title: 'BILL_PAYMENT_REJECTED',
	// title: 'ROLE_CHANGED',
	// title: 'LEFT',
	// title: 'REMOVED',

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