import React, {useContext, useState} from 'react';
import publicIP from 'react-native-public-ip';
import {isEmailValid, isFullNameValid, isUsernameValid, isPasswordValid, isConfirmPasswordMatch} from '../utils/validator.utils';
import {LocalizationContext} from '../contexts/language.context';
import {PopUpContext} from '../contexts/popup.context';
import {SpinnerContext} from '../contexts/spinner.context';
import {UserContext} from '../contexts/user.context';
import SignUp from '../components/SignUp/SignUp.component';
import {get, post} from '../utils/api.utils';

const SignUpPage = ({navigation}) => {
	const {translations, appLanguage, setAppLanguage, languageIcons} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {updateUserData} = useContext(UserContext);
	
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

	const signUp = async (email, username, fullName, password) => {
		showSpinner();
		const ipAddress = await publicIP();
		const body = {
			'email': email,
			'user_name': username,
			'full_name': fullName,
			'password': password,
			'ip_address': ipAddress
		};
		const userLoginData = await post(`/users`, body);
		if (userLoginData === null) {
			showPopUp('No Connection');
			return;
		} else if (userLoginData['error_schema']['error_code'] !== 'HIVEZ-000-0000') { 
			showPopUp(userLoginData['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			return;
		};
		updateUserData({
			'id': userLoginData['output_schema']['user_id'],
			'loginId': userLoginData['output_schema']['loginId'],
			'loginToken': userLoginData['output_schema']['loginToken'],
			'fullName': fullName,
			'email': email,
			'username': username,
			'allowOthersAddByID': true,
			'image': ''
		});
		hideSpinner();
	};

	const onPressNextButton = async () => {
		if(!secondPhase) {
			showSpinner();
			const result = await get(`/users/email/${email}`);
			if (result === null) showPopUp('No Connection');
			else if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') togglePhase();
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			hideSpinner();
		}
		else {
			signUp(email, username, fullName, password);
		}
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