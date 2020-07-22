import React, {createContext, useState} from 'react';

export const PopUpContext = createContext();

export const PopUpProvider = ({children}) => {
	const [popUpState, setPopUpState] = useState(false);
	const [message, setMessage] = useState('');

	const showPopUp = (message) => {
		setPopUpState(true);
		setMessage(message);
	};

	const hidePopUp = () => {
		setPopUpState(false);
		setMessage('');
	};

	return (
		<PopUpContext.Provider
			value = {{
				popUpState,
				message,
				showPopUp,
				hidePopUp
			}}>
			{children}
		</PopUpContext.Provider>
	);
};