import React, {createContext, useState} from 'react';
import Storage from './storage.utils';

// const [userData, setUserData] = useState({});

export const UserDataContext = createContext({
	updateUserData: () => {},
	initializeUserData: () => {},
});

export const UserDataProvider = ({children}) => {
	const [userData, setUserData] = useState({});

	const updateUserData = userData => {
        setUserData(userData);
		Storage.set(Storage.keys.USER_LOGIN_DATA, userData);
	};

	const initializeUserData = async () => {
		const userData = await Storage.get(Storage.keys.USER_LOGIN_DATA);
		if (userData) {
			updateUserData(userData);
		}
	};

	return (
		<UserDataContext.Provider
			value = {{
				userData,
				updateUserData: updateUserData,
				initializeUserData
			}}>
			{children}
		</UserDataContext.Provider>
	);
};