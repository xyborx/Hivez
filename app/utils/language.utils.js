import React, {createContext, useState} from 'react';
import Storage from './storage.utils';
import * as RNLocalize from "react-native-localize";
import LocalizedStrings from 'react-native-localization';
import en from '../config/language/en/index';
import id from '../config/language/id/index';
import languageIcons from '../config/map/FlagIcon.map.json';

const DEFAULT_LANGUAGE = 'en';

const languages = {
	en,
	id
};

const translations = new LocalizedStrings(languages);

export const LocalizationContext = createContext({
	translations,
	setAppLanguage: () => {},
	appLanguage: DEFAULT_LANGUAGE,
	initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({children}) => {
	const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

	const setLanguage = language => {
		translations.setLanguage(language);
		setAppLanguage(language);
		Storage.set(Storage.keys.LANGUAGES, language);
	};

	const initializeAppLanguage = async () => {
		const currentLanguage = await Storage.get(Storage.keys.LANGUAGES);

		if (currentLanguage) {
			setLanguage(currentLanguage);
		} else {
			let localeCode = DEFAULT_LANGUAGE;
			const supportedLocaleCodes = translations.getAvailableLanguages();
			const phoneLocaleCodes = RNLocalize.getLocales().map(
				locale => locale.languageCode,
			);
			phoneLocaleCodes.some(code => {
				if (supportedLocaleCodes.includes(code)) {
					localeCode = code;
					return true;
				}
			});
			setLanguage(localeCode);
		}
	};

	return (
		<LocalizationContext.Provider
			value = {{
				translations,
				setAppLanguage: setLanguage,
				appLanguage,
				initializeAppLanguage,
				languageIcons
			}}>
			{children}
		</LocalizationContext.Provider>
	);
};