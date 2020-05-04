import React, {useContext, useState} from 'react';
import {isEmailValid} from '../utils/validator.utils';
import {LocalizationContext} from '../utils/language.utils';
import SignIn from '../components/SignIn/SignIn.component';

const SignInPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, languageIcons} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [email, setEmail] = useState('');
	const [secondPhase, setSecondPhase] = useState(false);
	const [password, setPassword] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeEmail = (email) => {
		setEmail(email);
		setNextButtonAccessbility(isEmailValid(email).isValid);
	}

	const togglePhase = () => {
		setNextButtonAccessbility(secondPhase);
		setSecondPhase(!secondPhase);
		setPassword('');
	}

	const onChangePassword = (password) => {
		setPassword(password);
		if (password.length > 0) setNextButtonAccessbility(true);
		else setNextButtonAccessbility(false);
	}

	const signIn = () => {}

	const onPressNextButton = () => {
		if(!secondPhase) togglePhase();
		else signIn();
	}

	const forgotPassword = () => {
		navigation.navigate('ForgotPassword');
	}

	const signUp = () => {
		navigation.navigate('SignUp');
	}

	return (
		<SignIn
			contentText={translations['SignIn']}
			emailContext={translations['EmailValidation']}
			passwordContext={translations['PasswordValidation']}
			dropdownContext={translations['DropdownLanguage']}
			languageList={translations.getAvailableLanguages()}
			languageContext={translations['Language']}
			email={email}
			setEmail={onChangeEmail}
			secondPhase={secondPhase}
			togglePhase={togglePhase}
			password={password}
			setPassword={onChangePassword}
			nextButtonAccessbility={nextButtonAccessbility}
			onPressNextButton={onPressNextButton}
			currentLanguage={appLanguage}
			languageIcons={languageIcons}
			setLanguage={setAppLanguage}
			signUp={signUp}
			forgotPassword={forgotPassword} />
	);
};

export default SignInPage;