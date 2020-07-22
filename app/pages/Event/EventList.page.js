import React, {useContext, useRef, useState, useCallback} from 'react';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import EventList from '../../components/Event/EventList.component';
import {get} from '../../utils/api.utils';

const EventListPage = ({navigation}) => {
	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventList, setEventList] = useState([]);
	const [displayedEventList, setDisplayedEventList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const fetchData = () => {
		return new Promise ((resolve, reject) => {
			(async () => {
				try {
					const data = await get(`/users/${userData.id}/events`);
					resolve(
						data['output_schema'].map(item => {
							return {
								id: item['event_id'],
								image: item['event_picture'],
								name: item['event_name'],
								memberCount: item['member_count']
							}
						})
					);
				} catch (error) {
					console.log(error.stack);
					reject(error);
				};
			})();
		});
	};

	useFocusEffect(
		useCallback(() => {
			showSpinner();
			fetchData().then(result => {
				setEventList(result);
				setDisplayedEventList(result);
				hideSpinner();
			});
		}, [])
	);

	const onRefresh = useCallback(() => {
		showSpinner();
		fetchData().then(result => {
			setEventList(result);
			setDisplayedEventList(result);
			hideSpinner();
		});
	}, []);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedEventList(eventList);
		else setDisplayedEventList(eventList.filter((item) => {
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
			onRefresh={onRefresh}
			eventList={displayedEventList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			onEventClick={navigateToEvent}
			findEvent={findEvent}
			createEvent={createEvent} />
	);
};

export default EventListPage;