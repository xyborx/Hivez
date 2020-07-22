import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import JoinGroupApprovalList from '../../components/Group/JoinGroupApprovalList.component';
import {get, put} from '../../utils/api.utils';

const JoinGroupApprovalListPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
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
				await initializeGroupData(groupID, userData.id);
				const users = await get(`/groups/${groupID}/join-request`);
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
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const updateJoinGroupApproval = async (userID, approvalStatus) => {
		showSpinner();
		try {
			const body = {
				'approver_user_id': userData.id,
				'approval_status': approvalStatus
			};
			const result = await put(`/groups/join-request/${userID}/approval`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const approveJoin = () => {
		updateJoinGroupApproval('APPROVED');
	};

	const rejectJoin = () => {
		updateJoinGroupApproval('REJECTED');
	};

	return (
		<JoinGroupApprovalList
			contentText={translations['JoinGroupApprovalList']}
			confirmApproveJoinText={translations['ConfirmApproveJoinGroup']}
			confirmRejectJoinText={translations['ConfirmRejectJoinGroup']}
			groupData={groupData}
			userList={displayedUserList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			approveJoin={approveJoin}
			rejectJoin={rejectJoin}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default JoinGroupApprovalListPage;