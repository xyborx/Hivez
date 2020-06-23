import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import JoinGroupApprovalList from '../../components/Group/JoinGroupApprovalList.component';
import {get, put} from '../../utils/api.utils';

const JoinGroupApprovalListPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
	const [userList, setUserList] = useState([]);
	const [displayedUserList, setDisplayedUserList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const users = await get(`/groups/${groupID}/join-request`);
				console.log(users);
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
		};
		fetchData();
	}, []);

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
		try {
			const body = {
				'approver_user_id': '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b',
				'approval_status': approvalStatus
			};
			const result = await put(`/groups/join-request/${userID}/approval`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
	};

	const approveJoin = (userID) => {
		updateJoinGroupApproval(userID, 'APPROVED').then(() => {});
	};

	const rejectJoin = (userID) => {
		updateJoinGroupApproval(userID, 'REJECTED').then(() => {});
	};

	return (
		<JoinGroupApprovalList
			contentText={translations['JoinGroupApprovalList']}
			confirmApproveJoinText={translations['ConfirmApproveJoinGroup']}
			confirmRejectJoinText={translations['ConfirmRejectJoinGroup']}
			groupData={groupDetail}
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