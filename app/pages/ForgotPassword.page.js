import React, {useContext, useState} from 'react';
import {isEmailValid} from '../utils/validator.utils';
import {LocalizationContext} from '../contexts/language.context';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.component';

const ForgotPasswordPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, languageIcons} = useContext(LocalizationContext);
	

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
			languageIcons={languageIcons}
			setLanguage={setAppLanguage}
			signIn={signIn}
			signUp={signUp} />
	);
};

export default ForgotPasswordPage;