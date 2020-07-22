import React, {useCallback, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import InviteEventMember from '../../components/Event/InviteEventMember.component';
import {get} from '../../utils/api.utils';

const InviteEventMemberPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventMembers, setEventMembers] = useState([]);
	const [displayedEventMembers, setDisplayedEventMembers] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeEventData(eventID, userData.id);
				const users = await get(`/events/${eventID}/users/inviteable`);
				const userList = users['output_schema'].map(item => {
					return {
						id: item['user_id'],
						image: item['user_picture'],
						name: item['full_name'],
						username: item['user_name']
					}
				});
				setEventMembers(userList);
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedEventMembers([]);
		else setDisplayedEventMembers(eventMembers.filter((item) => {
			return item.username.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const goBack = () => {
		navigation.replace('EventList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const inviteEventMember = async (userID) => {
		showSpinner();
		try {
			const body = {
				'inviter_user_id': userData.id,
				'invited_user_id': userID,
				'invited_source_id': eventID
			};
			const result = await post(`/events/invitations`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	return (
		<InviteEventMember
			contentText={translations['InviteEventMember']}
			confirmInviteMemberText={translations['ConfirmInviteEventMember']}
			eventData={eventData}
			eventMembers={displayedEventMembers}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			inviteEventMember={inviteEventMember}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default InviteEventMemberPage;