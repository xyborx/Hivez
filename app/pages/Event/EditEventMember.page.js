import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import EditEventMember from '../../components/Event/EditEventMember.component';
import {get, put, del} from '../../utils/api.utils';

const EditEventMemberPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventMembers, setEventMembers] = useState([]);
	const [displayedEventMembers, setDisplayedEventMembers] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					await initializeEventData(eventID, userData.id);
					const members = await get(`/events/${eventID}/members`);
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
					setEventMembers(memberList);
					setDisplayedEventMembers(memberList);
				} catch (error) {
					console.log(error.stack);
				};
			};
			fetchData();
		}, [])
	);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedEventMembers(eventMembers);
		else setDisplayedEventMembers(eventMembers.filter((item) => {
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
			const result = await put(`/events/${eventID}/members/${userID}/role`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					let currentEventMember = eventMembers;
					currentEventMember[eventMembers.findIndex(member => member.id === userID)].role = role
					setEventMembers(currentEventMember);
					setDisplayedEventMembers(currentEventMember.filter((item) => {
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
			const result = await del(`/events/${eventID}/members/${userID}`);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					setEventMembers(eventMembers.filter(member => member.id !== userID));
					setDisplayedEventMembers(displayedEventMembers.filter(member => member.id !== userID));
				}
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	return (
		<EditEventMember
			contentText={translations['EditEventMember']}
			confirmRemoveText={translations['ConfirmRemoveEventMember']}
			dropdownChangeRoleText={translations['DropdownChangeRole']}
			confirmChangeRoleText={translations['ConfirmChangeRoleEventMember']}
			eventData={eventData}
			eventMembers={displayedEventMembers}
			currentUser={userData.id}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			changeUserRole={changeUserRole}
			removeUser={removeUser}
			goBack={goBack} />
	);
};

export default EditEventMemberPage;