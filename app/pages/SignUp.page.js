import React, {useContext, useState} from 'react';
import {isEmailValid, isFullNameValid, isPasswordValid, isConfirmPasswordMatch} from '../utils/helper.utils';
import {LocalizationContext} from '../utils/language.utils';
import SignUp from '../components/SignUp/SignUp.component';

const SignUpPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, langaugeIcons} = useContext(LocalizationContext);
	initializeAppLanguage();
	
	const [email, setEmail] = useState('');
	const [secondPhase, setSecondPhase] = useState(false);
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeEmail = (email) => {
		setEmail(email);
		setNextButtonAccessbility(isEmailValid(email).isValid);
	}
	const togglePhase = () => {
		setNextButtonAccessbility(secondPhase);
		setSecondPhase(!secondPhase);
		setPassword('');
		setConfirmPassword('');
	}

	const checkConfirmPassword = (confirmPassword) => {
		return isConfirmPasswordMatch(password, confirmPassword);
	}

	const validateNextButton = (fullName, password, confirmPassword) => {
		setNextButtonAccessbility(isFullNameValid(fullName).isValid &&
			isPasswordValid(password).isValid &&
			isConfirmPasswordMatch(password, confirmPassword).isValid);
	}

	const onChangePassword = (password) => {
		setPassword(password);
		validateNextButton(fullName, password, confirmPassword);
	}

	const onChangeConfirmPassword = (confirmPassword) => {
		setConfirmPassword(confirmPassword);
		validateNextButton(fullName, password, confirmPassword);
	}
	
	const signUp = () => {}

	const onPressNextButton = () => {
		if(!secondPhase) togglePhase();
		else signUp();
	}

	const forgotPassword = () => {
		navigation.navigate('ForgotPassword');
	}

	const signIn = () => {
		navigation.navigate('SignIn');
	}

	return (
		<SignUp
			contentText={translations['SignUp']}
			emailContext={translations['EmailValidation']}
			fullNameContext={translations['FullNameValidation']}
			passwordContext={translations['PasswordValidation']}
			dropdownContext={translations['DropdownLanguage']}
			languageList={translations.getAvailableLanguages()}
			languageContext={translations['Language']}
			email={email}
			setEmail={onChangeEmail}
			secondPhase={secondPhase}
			togglePhase={togglePhase}
			fullName={fullName}
			setFullName={setFullName}
			validateFullName={isFullNameValid}
			password={password}
			setPassword={onChangePassword}
			confirmPassword={confirmPassword}
			setConfirmPassword={onChangeConfirmPassword}
			checkConfirmPassword={checkConfirmPassword}
			nextButtonAccessbility={nextButtonAccessbility}
			onPressNextButton={onPressNextButton}
			currentLanguage={appLanguage}
			langaugeIcons={langaugeIcons}
			setLanguage={setAppLanguage}
			signIn={signIn}
			forgotPassword={forgotPassword} />
	);
};

export default SignUpPage;