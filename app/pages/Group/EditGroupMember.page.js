import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import EditGroupMember from '../../components/Group/EditGroupMember.component';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {get, put, del} from '../../utils/api.utils';

const EditGroupMemberPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [groupMembers, setGroupMembers] = useState([]);
	const [displayedGroupMembers, setDisplayedGroupMembers] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					await initializeGroupData(groupID, userData.id);
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
		}, [])
	);

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
		showSpinner();
		try {
			const body = {
				'role': role
			};
			const result = await put(`/groups/${groupID}/members/${userID}/role`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					let currentGroupMember = groupMembers;
					currentGroupMember[groupMembers.findIndex(member => member.id === userID)].role = role
					setGroupMembers(currentGroupMember);
					setDisplayedGroupMembers(currentGroupMember.filter((item) => {
						return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
					}));
				}
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const removeUser = async (userID) => {
		showSpinner();
		try {
			const result = await del(`/groups/${groupID}/members/${userID}`);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					setGroupMembers(groupMembers.filter(member => member.id !== userID));
					setDisplayedGroupMembers(displayedGroupMembers.filter(member => member.id !== userID));
				}
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	return (
		<EditGroupMember
			contentText={translations['EditGroupMember']}
			confirmRemoveText={translations['ConfirmRemoveGroupMember']}
			dropdownChangeRoleText={translations['DropdownChangeRole']}
			confirmChangeRoleText={translations['ConfirmChangeRoleGroupMember']}
			groupData={groupData}
			groupMembers={displayedGroupMembers}
			currentUser={userData.id}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			changeUserRole={changeUserRole}
			removeUser={removeUser}
			goBack={goBack} />
	);
};

export default EditGroupMemberPage;