import React, {useContext, useState} from 'react';
import {isEmailValid} from '../utils/helper.utils';
import {LocalizationContext} from '../utils/language.utils';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.component';

const ForgotPasswordPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, langaugeIcons} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [email, setEmail] = useState('');
	const [secondPhase, setSecondPhase] = useState(false);
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeEmail = (email) => {
		setEmail(email);
		setNextButtonAccessbility(isEmailValid(email).isValid);
	}

	const togglePhase = () => {
		setNextButtonAccessbility(secondPhase);
		setSecondPhase(!secondPhase);
	}

	const forgotPassword = () => {}

	const onPressNextButton = () => {
		if(!secondPhase) togglePhase();
		else forgotPassword();
	}

	const signIn = () => {
		navigation.navigate('SignIn');
	}

	const signUp = () => {
		navigation.navigate('SignUp');
	}

	return (
		<ForgotPassword
			contentText={translations['ForgotPassword']}
			emailContext={translations['EmailValidation']}
			dropdownContext={translations['DropdownLanguage']}
			languageList={translations.getAvailableLanguages()}
			languageContext={translations['Language']}
			email={email}
			setEmail={onChangeEmail}
			secondPhase={secondPhase}
			togglePhase={togglePhase}
			nextButtonAccessbility={nextButtonAccessbility}
			onPressNextButton={onPressNextButton}
			currentLanguage={appLanguage}
			langaugeIcons={langaugeIcons}
			setLanguage={setAppLanguage}
			signIn={signIn}
			signUp={signUp} />
	);
};

export default ForgotPasswordPage;