import React, {createContext, useState} from 'react';
import Storage from '../utils/storage.utils';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
	const [userData, setUserData] = useState();

	const initializeUserData = async () => {
		const currentUserData = await Storage.get(Storage.keys.USER_LOGIN_DATA);
		if (currentUserData) {
			const data = JSON.parse(currentUserData);
			setUserData(data);
		};
	};

	const updateUserData = data => {
		setUserData(data);
		Storage.set(Storage.keys.USER_LOGIN_DATA, JSON.stringify(data));
	};

	const clearUserData = () => {
		setUserData();
		Storage.remove(Storage.keys.USER_LOGIN_DATA);
	};

	return (
		<UserContext.Provider
			value = {{
				clearUserData,
				userData,
				updateUserData,
				initializeUserData
			}}>
			{children}
		</UserContext.Provider>
	);
};