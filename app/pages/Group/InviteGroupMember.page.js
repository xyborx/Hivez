import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import InviteGroupMember from '../../components/Group/InviteGroupMember.component';
import {get, post} from '../../utils/api.utils';

const InviteGroupMemberPage = ({route, navigation}) => {
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
				const users = await get(`/groups/${groupID}/users/inviteable`);
				console.log(users);
				const userList = users['output_schema'].map(item => {
					return {
						id: item['user_id'],
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
		try {
			const body = {
				'inviter_user_id': '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b',
				'invited_user_id': userID,
				'invited_source_id': groupID
			};
			const result = await post(`/groups/invitations`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
	};

	return (
		<InviteGroupMember
			contentText={translations['InviteGroupMember']}
			confirmInviteMemberText={translations['ConfirmInviteGroupMember']}
			groupData={groupDetail}
			userList={displayedUserList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			inviteGroupMember={inviteGroupMember}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default InviteGroupMemberPage;