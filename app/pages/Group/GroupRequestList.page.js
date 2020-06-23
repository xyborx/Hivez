import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {where} from '../../utils/query.utils';
import GroupRequestList from '../../components/Group/GroupRequestList.component';
import {get} from '../../utils/api.utils';

const GroupRequestListPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
	const [displayedRequestStatus, setDisplayedRequestStatus] = useState('NOT_COMPLETED');
	const [requestList, setRequestList] = useState([]);
	const [displayedRequestList, setDisplayedRequest] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	const customSelectRequest = (requestList, status) => {
		if (status === 'COMPLETED') return where(requestList, 'status', checkItem => checkItem !== 'ON_PROGRESS');
		return where(requestList, 'status', checkItem => checkItem === 'ON_PROGRESS');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requests = await get(`/requests/${groupID}/lists`);
				console.log(requests);
				const requestLists = requests['output_schema'].map(item => {
					return {
						id: item['request_id'],
						name: item['request_description'],
						date: item['created_date'],
						value: item['request_amount'],
						approver: item['approver_name'],
						type: item['requester_type'],
						status: item['approval_status'] === '' ? 'ON_PROGRESS' : item['approval_status'],
						image: item['requester_picture']
					}
				});
				setRequestList(requestLists);
				setDisplayedRequest(customSelectRequest(requestLists, displayedRequestStatus));
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	const onChangeDisplayedRequestStatus = (status) => {
		setDisplayedRequestStatus(status);
		const currentList = customSelectRequest(requestList, status);
		if(searchValue === '') setDisplayedRequest(currentList);
		else setDisplayedRequest(where(currentList, 'name', checkItem => checkItem.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0));
	};

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		const currentList = customSelectRequest(requestList, displayedRequestStatus);
		if(searchQuery === '') setDisplayedRequest(currentList);
		else setDisplayedRequest(where(currentList, 'name', checkItem => checkItem.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0));
	};

	const navigateToRequestDetail = (requestID) => {
		navigation.navigate('GroupRequestDetail', {
			requestID: requestID,
			groupID: groupID
		});
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<GroupRequestList
			contentText={translations['GroupRequestList']}
			groupDetail={groupDetail}
			displayedRequestStatus={displayedRequestStatus}
			setDisplayedRequestStatus={onChangeDisplayedRequestStatus}
			requestList={displayedRequestList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			navigateToRequestDetail={navigateToRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupRequestListPage;