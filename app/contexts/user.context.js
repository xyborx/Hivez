import React, {createContext, useState, useEffect} from 'react';
import {get} from '../utils/api.utils';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
	const [userData, setUserData] = useState({});

	const fetchData = async (userID) => {
		const data = await get(`/users/${userID}/profile`);
		const image = await get(`/users/${userID}/picture`);
		return {
			id: userID,
			image: image['output_schema']['user_picture'],
			fullName: data['output_schema']['full_name'],
			email: data['output_schema']['email'],
			username: data['output_schema']['user_name'],
			allowOthersAddByID: data['output_schema']['is_searchable'] === 'Y' ? true : false
		};
	};

	const initializeUserData = async (userID) => {
		const currentUserData = userData;

		if (Object.keys(currentUserData).length === 0 && currentUserData.constructor === Object) {
			const newUserData = await fetchData(userID);
			setUserData(newUserData);
			return newUserData;
		} else if (currentUserData.hasOwnProperty('id') && currentUserData['id'] !== userID) {
			const newUserData = await fetchData(userID);
			setUserData(newUserData);
			return newUserData;
		} else {
			return currentUserData;
		}
	};

	return (
		<UserContext.Provider
			value = {{
				userData,
				setUserData,
				initializeUserData
			}}>
			{children}
		</UserContext.Provider>
	);
};