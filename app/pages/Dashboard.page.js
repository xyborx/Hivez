import React, {useContext, useRef, useState, useCallback} from 'react';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../contexts/language.context';
import {SpinnerContext} from '../contexts/spinner.context';
import {UserContext} from '../contexts/user.context';
import Dashboard from '../components/Dashboard/Dashboard.component';
import {get, put} from '../utils/api.utils';
import {padArray} from '../utils/helper.utils';

const DashboardPage = ({navigation}) => {
	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const {translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const navigateToEvent = (eventID) => {
		showSpinner();
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

	const navigateToGroup = (groupID) => {
		showSpinner();
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

	const createGroupRequest = (groupID) => {
		showSpinner();
		navigation.navigate('GroupTab', {
			screen: 'GroupDrawer',
			initial: true,
			params: {
				screen: 'CreateGroupRequest',
				initial: true,
				params: {groupID: groupID}
			}
		});
	};

	const createEventRequest = (eventID) => {
		showSpinner();
		navigation.navigate('EventTab', {
			screen: 'EventDrawer',
			initial: true,
			params: {
				screen: 'CreateEventRequest',
				initial: true,
				params: {eventID: eventID}
			}
		});
	};

	const viewGroupBill = (groupID) => {
		showSpinner();
		navigation.navigate('GroupTab', {
			screen: 'GroupDrawer',
			initial: true,
			params: {
				screen: 'GroupBillList',
				initial: true,
				params: {groupID: groupID}
			}
		});
	};

	const viewGroupReport = (groupID) => {
		showSpinner();
		navigation.navigate('GroupTab', {
			screen: 'GroupDrawer',
			initial: true,
			params: {
				screen: 'GroupReport',
				initial: true,
				params: {groupID: groupID}
			}
		});
	};

	const viewEventReport = (eventID) => {
		showSpinner();
		navigation.navigate('EventTab', {
			screen: 'EventDrawer',
			initial: true,
			params: {
				screen: 'EventReport',
				initial: true,
				params: {eventID: eventID}
			}
		});
	};

	const pendingApprovalListDummy = [{
		type: 'JOIN_GROUP',
		count: 69,
		icon: 'user-plus',
		action: () => viewPendingApprovalList('JOIN_GROUP')
	}, {
		type: 'JOIN_EVENT',
		count: 21,
		icon: 'calendar-plus',
		action: () => viewPendingApprovalList('JOIN_EVENT')
	}, {
		type: 'REQUEST_PAYMENT',
		count: 420,
		icon: 'tasks',
		action: () => viewPendingApprovalList('REQUEST_PAYMENT')
	}, {
		type: 'BILL_PAYMENT',
		count: 13,
		icon: 'vote-yea',
		action: () => viewPendingApprovalList('BILL_PAYMENT')
	}, {
		type: 'BILL_CREATION',
		count: 99,
		icon: 'receipt',
		action: () => viewPendingApprovalList('BILL_CREATION')
	}];

	const viewGroupRequestDetail = (requestID) => {
		showSpinner();
		navigation.navigate('GroupTab', {
			screen: 'GroupRequestDetail',
			initial: true,
			params: {
				requestID: requestID,
				groupID: '6800e162-b377-11ea-9f7a-3ca82aaa2b5b'
			}
		});
	};

	const viewGroupBillDetail = (billID) => {
		showSpinner();
		navigation.navigate('GroupTab', {
			screen: 'GroupBillDetail',
			initial: true,
			params: {billID: billID}
		});
	};

	const viewEventRequestDetail = (requestID) => {
		showSpinner();
		navigation.navigate('EventTab', {
			screen: 'EventRequestDetail',
			initial: true,
			params: {requestID: requestID}
		});
	};

	const viewPendingApprovalList = (type) => {
		// navigation.navigate('PendingApprovalList', {
		// 	type: type
		// });
		alert(`Navigate to pending list ${type}`);
	};

	const fetchData = () => {
		return new Promise ((resolve, reject) => {
			(async () => {
				try {
					let data = [];
					const favouriteItems = await get(`/users/${userData.id}/favourite-lists`);
					data['favourite_items'] = favouriteItems['output_schema'].map(item => {
						return {
							id: item['id'],
							name: item['name'],
							description: item['description'],
							image: item['picture'],
							type: item['type'],
							onClick: item['type'] === 'EVENT' ? navigateToEvent : navigateToGroup,
							action: item['type'] === 'EVENT' ? [{
								icon: 'request',
								name: 'REQUEST',
								action: createEventRequest
							}, {
								icon: 'viewReport',
								name: 'VIEW_REPORT',
								action: viewEventReport
							}] : [{
								icon: 'request',
								name: 'REQUEST',
								action: createGroupRequest
							}, {
								icon: 'payBill',
								name: 'PAY_BILL',
								action: viewGroupBill
							}, {
								icon: 'viewReport',
								name: 'VIEW_REPORT',
								action: viewGroupReport
							}]
						}
					});
					const transactions = await get(`/users/${userData.id}/transactions`);
					data['transactions'] = transactions['output_schema'].map(item => {
						return {
							id: item['id'],
							name: item['description'],
							date: item['created_date'],
							sourceName: item['source_name'],
							sourceType: item['source_type'],
							type: item['type'],
							value: item['amount'],
							status: item['approval_status'],
							image: item['source_picture']
						}
					});
					resolve(data);
				} catch (error) {
					console.log(error);
					reject(error);
				};
			})();
		});
	};

	const [refreshing, setRefreshing] = useState(false);
	const [favouriteItemList, setFavouriteItemList] = useState([]);
	const [pendingApprovalList, setPendingApprovalList] = useState(pendingApprovalListDummy);
	const [transactionList, setTransactionList] = useState([]);
	const [displayedTransactionList, setDisplayedTransactionList] = useState([]);

	const filterData = (type) => {
		if (type === 'ALL') setDisplayedTransactionList(padArray(transactionList, 5, null));
		else setDisplayedTransactionList(padArray(transactionList.filter((item) => {return item.status === type}), 5, null));
	};

	useFocusEffect(
		useCallback(() => {
			showSpinner();
			fetchData().then(result => {
				setFavouriteItemList(result['favourite_items']);
				setTransactionList(result['transactions']);
				setDisplayedTransactionList(padArray(result['transactions'], 5, null));
				hideSpinner();
			});
		}, [])
	);

	const onRefresh = useCallback(() => {
		showSpinner();
		fetchData().then(result => {
			setFavouriteItemList(result['favourite_items']);
			setTransactionList(result['transactions']);
			setDisplayedTransactionList(padArray(result['transactions'], 5, null));
			hideSpinner();
		});
	}, [refreshing]);

	return (
		<Dashboard
			scrollRef={scrollRef}
			refreshing={refreshing}
			onRefresh={onRefresh}
			contentText={translations['Dashboard']}
			recentTransactionText={translations['RecentTransaction']}
			userName={userData.fullName}
			favouriteItemList={favouriteItemList}
			transactionList={displayedTransactionList}
			filterTransaction={filterData}
			pendingApprovalList={pendingApprovalList}
			onEventRequestDetailClick={viewEventRequestDetail}
			onGroupBillDetailClick={viewGroupBillDetail}
			onGroupRequestDetailClick={viewGroupRequestDetail} />
	);
};

export default DashboardPage;