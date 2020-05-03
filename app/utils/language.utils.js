import React, {createContext, useState} from 'react';
import Storage from './storage.utils';
import * as RNLocalize from "react-native-localize";
import LocalizedStrings from 'react-native-localization';
import moment from "moment";
import en from '../config/language/en.language';
import id from '../config/language/id.language';
import languageIcons from '../config/map/FlagIcon.map.json';
import momentLocalization from '../config/moment/index';;

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
		moment.updateLocale(language, momentLocalization[language]);
		Storage.set(Storage.keys.LANGUAGES, language);
	};

	const initializeAppLanguage = async () => {
		const currentLanguage = await Storage.get(Storage.keys.LANGUAGES);

		if (currentLanguage) {
			setLanguage(currentLanguage);
			moment.updateLocale(currentLanguage, momentLocalization[currentLanguage]);
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
			moment.updateLocale(localeCode, momentLocalization[localeCode]);
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