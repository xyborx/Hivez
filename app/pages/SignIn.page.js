import React, {useContext, useState} from 'react';
import {isEmailValid, isPasswordValid} from '../utils/helper.utils';
import {LocalizationContext} from '../utils/language.utils';
import SignIn from '../components/SignIn/SignIn.component';

const SignInPage = () => {
	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, langaugeIcons} = useContext(LocalizationContext);
	initializeAppLanguage();
	
	const [email, setEmail] = useState('');
	const [emailEditability, setEmailEditability] = useState(true);
	const [emailValidity, setEmailValidity] = useState(true);
	const [password, setPassword] = useState('');
	const [passwordAccessbility, setPasswordAccessbility] = useState(false);
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [passwordValidity, setPasswordValidity] = useState(true);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeEmail = (email) => {
		setEmail(email);
		const result = isEmailValid(email);
		setEmailValidity(result);
		setNextButtonAccessbility(result);
	}

	const togglePasswordAccessbility = () => {
		setNextButtonAccessbility(passwordAccessbility ? emailValidity : false);
		setEmailEditability(!emailEditability)
		setPasswordAccessbility(!passwordAccessbility);
		setPasswordValidity(true);
		setPassword('');
	}

	const togglePasswordVisibility = () => {
		setPasswordVisibility(!passwordVisibility);
	}

	const onChangePassword = (password) => {
		setPassword(password);
		const result = isPasswordValid(password);
		setPasswordValidity(result.isValid);
		setPasswordErrorMessage(result.message);
		setNextButtonAccessbility(result.isValid);
	}

	const onPressNextButton = () => {
		if(emailEditability) togglePasswordAccessbility();
		// submit
	}

	return (
		<SignIn
			contentText={translations}
			email={email}
			setEmail={onChangeEmail}
			emailEditability={emailEditability}
			emailValidity={emailValidity}
			passwordAccessbility={passwordAccessbility}
			password={password}
			setPassword={onChangePassword}
			passwordVisibility={passwordVisibility}
			togglePasswordAccessbility={togglePasswordAccessbility}
			togglePasswordVisibility={togglePasswordVisibility}
			passwordValidity={passwordValidity}
			passwordErrorMessage={passwordErrorMessage}
			nextButtonAccessbility={nextButtonAccessbility}
			onPressNextButton={onPressNextButton}
			currentLanguage={appLanguage}
			availableLanguage={translations.getAvailableLanguages()}
			availableLanguageContext={translations['Language']}
			langaugeIcons={langaugeIcons}
			setLanguage={setAppLanguage} />
	);
};

export default SignInPage;