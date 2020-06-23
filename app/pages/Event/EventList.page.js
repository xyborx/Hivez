import React, {useContext, useRef, useState, useEffect} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import {LocalizationContext} from '../../utils/language.utils';
import EventList from '../../components/Event/EventList.component';
import {get} from '../../utils/api.utils';

const EventListPage = ({navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);
	
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	const [eventList, setEventList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await get(`/users/${userID}/events`);
				setEventList(data['output_schema'].map(item => {
					return {
						id: item['event_id'],
						image: item['event_picture'],
						name: item['event_name'],
						memberCount: item['member_count']
					}
				}));
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setEventList(eventListDummy);
		else setEventList(eventListDummy.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	}

	const navigateToEvent = (eventID) => {
		navigation.navigate('EventDrawer', {
			screen: 'EventDetail',
			initial: true,
			params: {eventID: eventID}
		});
	};

	const createEvent = () => {
		navigation.navigate('CreateEvent');
	}

	const findEvent = () => {
		navigation.navigate('FindEvent');
	}

	return (
		<EventList
			scrollRef={scrollRef}
			contentText={translations['EventList']}
			eventList={eventList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			onEventClick={navigateToEvent}
			findEvent={findEvent}
			createEvent={createEvent} />
	);
};

export default EventListPage;