import React, {createContext, useState} from 'react';
import {get} from '../utils/api.utils';

export const EventContext = createContext();

export const EventProvider = ({children}) => {
	const [eventData, setEventData] = useState({});

	const fetchData = async (eventID, userID) => {
		try {
			const data = await get(`/events/${eventID}/detail?user-id=${userID}`);
			const image = await get(`/events/${eventID}/picture`);
			return {
				id: eventID,
				image: image['output_schema']['event_picture'],
				name: data['output_schema']['event_name'],
				description: data['output_schema']['event_description'],
				allowSearchByName: data['output_schema']['is_searchable'] === 'Y' ? true : false,
				totalExpense: data['output_schema']['total_expense'],
				role: data['output_schema']['user_role']
			};
		} catch (error) {
			console.log(error.stack);
		}
	};

	const initializeEventData = async (eventID, userID) => {
		try {
			const currentEventData = eventData;
			if ((Object.keys(currentEventData).length === 0 && currentEventData.constructor === Object) ||
				(currentEventData.hasOwnProperty('id') && currentEventData['id'] !== eventID)) {
				setEventData(await fetchData(eventID, userID));
			}
		} catch (error) {
			console.log(error.stack);
		}
	};

	const updateEventData = data => {
		setEventData(data);
	};

	return (
		<EventContext.Provider
			value = {{
				eventData,
				updateEventData,
				initializeEventData
			}}>
			{children}
		</EventContext.Provider>
	);
};