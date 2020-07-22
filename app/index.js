import 'react-native-gesture-handler';
import React from 'react';
import App from './App.container';
import {LocalizationProvider} from './contexts/language.context';
import {PopUpProvider} from './contexts/popup.context';
import {SpinnerProvider} from './contexts/spinner.context';
import {UserProvider} from './contexts/user.context';

export default function Hivez() {
	return (
		<SpinnerProvider>
			<PopUpProvider>
				<UserProvider>
					<LocalizationProvider>
						<App/>
					</LocalizationProvider>
				</UserProvider>
			</PopUpProvider>
		</SpinnerProvider>
	);
};