import React, {useContext, useState} from 'react';
import publicIP from 'react-native-public-ip';
import {isEmailValid} from '../utils/validator.utils';
import {LocalizationContext} from '../contexts/language.context';
import {PopUpContext} from '../contexts/popup.context';
import {SpinnerContext} from '../contexts/spinner.context';
import {UserContext} from '../contexts/user.context';
import SignIn from '../components/SignIn/SignIn.component';
import {post, get} from '../utils/api.utils';

const SignInPage = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [secondPhase, setSecondPhase] = useState(false);
	const [password, setPassword] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const {translations, appLanguage, setAppLanguage, languageIcons} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {updateUserData} = useContext(UserContext);

	const onChangeEmail = (email) => {
		setEmail(email);
		setNextButtonAccessbility(isEmailValid(email).isValid);
	};

	const togglePhase = () => {
		setNextButtonAccessbility(secondPhase);
		setSecondPhase(!secondPhase);
		setPassword('');
	};

	const onChangePassword = (password) => {
		setPassword(password);
		if (password.length > 0) setNextButtonAccessbility(true);
		else setNextButtonAccessbility(false);
	};

	const signIn = async (email, password) => {
		showSpinner();
		try {
			const ipAddress = await publicIP();
			const body = {
				'email': email,
				'password': password,
				'ip_address': ipAddress
			};
			const userLoginData = await post(`/users/login-token`, body);
			if (userLoginData === null) {
				hideSpinner();
				showPopUp('No Connection');
				return;
			} else if (userLoginData['error_schema']['error_code'] !== 'HIVEZ-000-0000') {
				hideSpinner();
				showPopUp(userLoginData['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
				return;
			}
			const userData = await get(`/users/${userLoginData['output_schema']['user_id']}/profile`);
			if (userData === null) {
				hideSpinner();
				showPopUp('No Connection');
				return;
			} else if (userData['error_schema']['error_code'] !== 'HIVEZ-000-0000') {
				hideSpinner();
				showPopUp(userData['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
				return;
			}
			const userPicture = await get(`/users/${userLoginData['output_schema']['user_id']}/picture`);
			if (userPicture === null) {
				hideSpinner();
				showPopUp('No Connection');
				return;
			} else if (userPicture['error_schema']['error_code'] !== 'HIVEZ-000-0000') {
				hideSpinner();
				showPopUp(userPicture['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
				return;
			}
			updateUserData({
				'id': userLoginData['output_schema']['user_id'],
				'loginId': userLoginData['output_schema']['loginId'],
				'loginToken': userLoginData['output_schema']['loginToken'],
				'fullName': userData['output_schema']['full_name'],
				'email': userData['output_schema']['email'],
				'username': userData['output_schema']['user_name'],
				'allowOthersAddByID': userData['output_schema']['is_searchable'] === 'Y' ? true : false,
				'image': userPicture['output_schema']['user_picture']
			});
		} catch (error) {
			console.log(error.stack);
			hideSpinner();
		}
		hideSpinner();
	};

	const onPressNextButton = () => {
		if(!secondPhase) togglePhase();
		else {
			signIn(email, password);
		}
	};

	const forgotPassword = () => {
		navigation.navigate('ForgotPassword');
	};

	const signUp = () => {
		navigation.navigate('SignUp');
	};

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