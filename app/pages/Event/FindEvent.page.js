import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import FindEvent from '../../components/Event/FindEvent.component';

const FindEventPage = ({navigation}) => {
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventList, setEventList] = useState([]);
	const [displayedEventList, setDisplayedEventList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedEventList([]);
		else setDisplayedEventList(eventList.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				const events = await get(`/events/${userData.id}/joinable`);
				const eventList = events['output_schema'].map(item => {
					return {
						id: item['event_id'],
						image: item['event_picture'],
						name: item['event_name'],
						description: item['event_description'],
						memberCount: item['member_count']
					}
				});
				setEventList(eventList);
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const requestJoinEvent = async (eventID) => {
		showSpinner();
		try {
			const body = {
				'source_id': eventID,
				'requester_user_id': userData.id
			};
			const result = await post(`/events/join-request`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<FindEvent
			contentText={translations['FindEvent']}
			confirmJoinText={translations['ConfirmJoinEvent']}
			eventList={displayedEventList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			goBack={goBack}
			requestJoinEvent={requestJoinEvent} />
	);
};

export default FindEventPage;