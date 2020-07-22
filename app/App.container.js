import React, {useContext, useEffect} from 'react';
import Router from './routes';
import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import {LocalizationContext} from './contexts/language.context';
import {SpinnerContext} from './contexts/spinner.context';
import {UserContext} from './contexts/user.context';
import MessageModal from './components/Modal/MessageModal.component';

export default function App() {
	const {initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeUserData} = useContext(UserContext);
	const {spinnerState} = useContext(SpinnerContext);
	
	useEffect(() => {
		// initializeAppLanguage();
		// initializeUserData();
		// SplashScreen.hide();
		const initialize = async () => {
			initializeAppLanguage();
			await initializeUserData();
			SplashScreen.hide();
		};
		initialize();
	}, []);

	return (
		<Router>
			<Spinner
				animation={'fade'}
				color={'#FFC60B'}
				overlayColor={'rgba(0,0,0,0.8)'}
				visible={spinnerState} />
			<MessageModal />
		</Router>
	);
};