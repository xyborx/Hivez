import React, {createContext, useState} from 'react';

export const SpinnerContext = createContext();

export const SpinnerProvider = ({children}) => {
	const [spinnerState, setSpinnerState] = useState(false);

	const showSpinner = () => {
		setSpinnerState(true);
	};

	const hideSpinner = () => {
		setSpinnerState(false);
	};

	return (
		<SpinnerContext.Provider
			value = {{
				spinnerState,
				showSpinner,
				hideSpinner
			}}>
			{children}
		</SpinnerContext.Provider>
	);
};