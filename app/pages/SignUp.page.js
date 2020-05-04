import React, {useContext, useState} from 'react';
import {isEmailValid, isFullNameValid, isUsernameValid, isPasswordValid, isConfirmPasswordMatch} from '../utils/validator.utils';
import {LocalizationContext} from '../utils/language.utils';
import SignUp from '../components/SignUp/SignUp.component';

const SignUpPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, languageIcons} = useContext(LocalizationContext);
	initializeAppLanguage();
	
	const [email, setEmail] = useState('');
	const [secondPhase, setSecondPhase] = useState(false);
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeEmail = (email) => {
		setEmail(email);
		setNextButtonAccessbility(isEmailValid(email).isValid);
	};

	const togglePhase = () => {
		setNextButtonAccessbility(secondPhase);
		setSecondPhase(!secondPhase);
		setPassword('');
		setConfirmPassword('');
	};

	const checkConfirmPassword = (confirmPassword) => {
		return isConfirmPasswordMatch(password, confirmPassword);
	};

	const validateNextButton = (username, fullName, password, confirmPassword) => {
		setNextButtonAccessbility(isUsernameValid(username).isValid &&
			isFullNameValid(fullName).isValid &&
			isPasswordValid(password).isValid &&
			isConfirmPasswordMatch(password, confirmPassword).isValid);
	};

	const onChangeUsername = (username) => {
		setUsername(username);
		validateNextButton(username, fullName, password, confirmPassword);
	};

	const onChangeFullName = (fullName) => {
		setFullName(fullName);
		validateNextButton(username, fullName, password, confirmPassword);
	};

	const onChangePassword = (password) => {
		setPassword(password);
		validateNextButton(username, fullName, password, confirmPassword);
	};

	const onChangeConfirmPassword = (confirmPassword) => {
		setConfirmPassword(confirmPassword);
		validateNextButton(username, fullName, password, confirmPassword);
	};
	
	const signUp = (email, username, fullName, password) => {
		alert(`Sign up!`);
	};

	const onPressNextButton = () => {
		if(!secondPhase) togglePhase();
		else signUp(email, username, fullName, password);
	};

	const forgotPassword = () => {
		navigation.navigate('ForgotPassword');
	};

	const signIn = () => {
		navigation.navigate('SignIn');
	};

	return (
		<SignUp
			contentText={translations['SignUp']}
			emailContext={translations['EmailValidation']}
			usernameContext={translations['UsernameValidation']}
			fullNameContext={translations['FullNameValidation']}
			passwordContext={translations['PasswordValidation']}
			dropdownContext={translations['DropdownLanguage']}
			languageList={translations.getAvailableLanguages()}
			languageContext={translations['Language']}
			email={email}
			setEmail={onChangeEmail}
			secondPhase={secondPhase}
			togglePhase={togglePhase}
			username={username}
			setUsername={onChangeUsername}
			validateUsername={isUsernameValid}
			fullName={fullName}
			setFullName={onChangeFullName}
			validateFullName={isFullNameValid}
			password={password}
			setPassword={onChangePassword}
			confirmPassword={confirmPassword}
			setConfirmPassword={onChangeConfirmPassword}
			checkConfirmPassword={checkConfirmPassword}
			nextButtonAccessbility={nextButtonAccessbility}
			onPressNextButton={onPressNextButton}
			currentLanguage={appLanguage}
			languageIcons={languageIcons}
			setLanguage={setAppLanguage}
			signIn={signIn}
			forgotPassword={forgotPassword} />
	);
};

export default SignUpPage;