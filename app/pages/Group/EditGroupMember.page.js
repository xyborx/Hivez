import React, {useContext, useState, useEffect} from 'react';
import EditGroupMember from '../../components/Group/EditGroupMember.component';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {get, put, del} from '../../utils/api.utils';

const EditGroupMemberPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
	const [groupMembers, setGroupMembers] = useState([]);
	const [displayedGroupMembers, setDisplayedGroupMembers] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);
	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const members = await get(`/groups/${groupID}/members`);
				const memberList = members['output_schema'].map(item => {
					return {
						id: item['user_id'],
						image: item['user_picture'],
						joinDate: item['join_date'],
						name: item['full_name'],
						role: item['role'],
						username: item['user_name']
					}
				});
				setGroupMembers(memberList);
				setDisplayedGroupMembers(memberList);
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedGroupMembers(groupMembers);
		else setDisplayedGroupMembers(groupMembers.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const goBack = () => {
		navigation.pop();
	};

	const changeUserRole = async (userID, role) => {
		try {
			const body = {
				'role': role
			};
			const result = await put(`/groups/${groupID}/members/${userID}/role`, body);
			console.log(result);
			let currentGroupMember = groupMembers;
			currentGroupMember[groupMembers.findIndex(member => member.id === userID)].role = role
			setGroupMembers(currentGroupMember);
			setDisplayedGroupMembers(currentGroupMember.filter((item) => {
				return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
			}));
		} catch(error) {
			console.log(error.stack);
		};
	};

	const removeUser = async (userID) => {
		try {
			const result = await del(`/groups/${groupID}/members/${userID}`);
			console.log(result);
			setGroupMembers(groupMembers.filter(member => member.id !== userID));
			setDisplayedGroupMembers(displayedGroupMembers.filter(member => member.id !== userID));
		} catch(error) {
			console.log(error.stack);
		};
	};

	return (
		<EditGroupMember
			contentText={translations['EditGroupMember']}
			confirmRemoveText={translations['ConfirmRemoveGroupMember']}
			dropdownChangeRoleText={translations['DropdownChangeRole']}
			confirmChangeRoleText={translations['ConfirmChangeRoleGroupMember']}
			groupData={groupDetail}
			groupMembers={displayedGroupMembers}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			changeUserRole={changeUserRole}
			removeUser={removeUser}
			goBack={goBack} />
	);
};

export default EditGroupMemberPage;