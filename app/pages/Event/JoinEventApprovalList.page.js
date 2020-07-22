import React, {useCallback, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import JoinEventApprovalList from '../../components/Event/JoinEventApprovalList.component';

const JoinEventApprovalListPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [userList, setUserList] = useState([]);
	const [displayedUserList, setDisplayedUserList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeEventData(eventID, userData.id);
				const users = await get(`/events/${eventID}/join-request`);
				const userList = users['output_schema'].map(item => {
					return {
						id: item['user_join_request_id'],
						image: item['user_picture'],
						name: item['full_name'],
						username: item['user_name']
					}
				});
				setUserList(userList);
				setDisplayedUserList(userList);
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setGroupMembers(userList);
		else setGroupMembers(userList.filter((item) => {
			return item.username.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const goBack = () => {
		navigation.replace('EventList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const updateJoinEventApproval = async (userID, approvalStatus) => {
		showSpinner();
		try {
			const body = {
				'approver_user_id': userData.id,
				'approval_status': approvalStatus
			};
			const result = await put(`/events/join-request/${userID}/approval`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const approveJoin = () => {
		updateJoinEventApproval('APPROVED');
	};

	const rejectJoin = () => {
		updateJoinEventApproval('REJECTED');
	};

	return (
		<JoinEventApprovalList
			contentText={translations['JoinEventApprovalList']}
			confirmApproveJoinText={translations['ConfirmApproveJoinEvent']}
			confirmRejectJoinText={translations['ConfirmRejectJoinEvent']}
			eventData={eventData}
			userList={displayedUserList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			approveJoin={approveJoin}
			rejectJoin={rejectJoin}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default JoinEventApprovalListPage;