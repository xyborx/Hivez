import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import InviteGroupMember from '../../components/Group/InviteGroupMember.component';
import {get, post} from '../../utils/api.utils';

const InviteGroupMemberPage = ({route, navigation}) => {
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
				const users = await get(`/groups/${groupID}/users/inviteable`);
				const userList = users['output_schema'].map(item => {
					return {
						id: item['user_id'],
						image: item['user_picture'],
						name: item['full_name'],
						username: item['user_name']
					}
				});
				setUserList(userList);
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedUserList([]);
		else setDisplayedUserList(userList.filter((item) => {
			return item.username.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const inviteGroupMember = async (userID) => {
		showSpinner();
		try {
			const body = {
				'inviter_user_id': userData.id,
				'invited_user_id': userID,
				'invited_source_id': groupID
			};
			const result = await post(`/groups/invitations`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	return (
		<InviteGroupMember
			contentText={translations['InviteGroupMember']}
			confirmInviteMemberText={translations['ConfirmInviteGroupMember']}
			groupData={groupData}
			userList={displayedUserList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			inviteGroupMember={inviteGroupMember}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default InviteGroupMemberPage;