import React, {useContext, useRef, useState} from 'react';
import publicIP from 'react-native-public-ip';
import {useScrollToTop} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {LocalizationContext} from '../contexts/language.context';
import {PopUpContext} from '../contexts/popup.context';
import {SpinnerContext} from '../contexts/spinner.context';
import {UserContext} from '../contexts/user.context';
import MyProfile from '../components/MyProfile/MyProfile.component';
import {get, put, del} from '../utils/api.utils';

const MyProfilePage = ({navigation}) => {
	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const {translations, appLanguage, setAppLanguage, languageIcons} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData, updateUserData, clearUserData} = useContext(UserContext);

	const [profileData, setProfileData] = useState(userData);

	const updateProfile = data => {
		setProfileData(data);
		updateUserData(data);
	};

	const changeProfileData = async (fullName, email, username) => {
		showSpinner();
		try {
			const body = {
				'full_name': fullName,
				'email': email,
				'user_name': username
			};
			const result = await put(`/users/${profileData.id}/profile`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateProfile({
						...profileData,
						fullName: fullName,
						email: email,
						username: username
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const changeProfilePicture = async (image) => {
		showSpinner();
		try {
			const body = {
				'user_picture': image.data
			};
			const result = await put(`/users/${profileData.id}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					await ImagePicker.clean();
					updateProfile({
						...profileData,
						image: image.data
					});
				}
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const deleteProfilePicture = async () => {
		showSpinner();
		try {
			const body = {
				'user_picture': ''
			};
			const result = await put(`/users/${profileData.id}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateProfile({
						...profileData,
						image: ''
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const pickerOption = {
		compressImageQuality: 0.8,
		cropping: true,
		cropperCancelText: translations['DropdownChangePicture']['CANCEL'],
		cropperChooseText : translations['DropdownChangePicture']['SAVE'],
		cropperCircleOverlay: true,
		cropperToolbarTitle: translations['DropdownChangePicture']['SELECT_PROFILE_PICTURE'],
		height: 480,
		includeBase64: true,
		mediaType: 'photo',
		useFrontCamera: true,
		width: 480
	};

	const openLibrary = () => {
		ImagePicker.openPicker(pickerOption).then(image => {
			changeProfilePicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const openCamera = () => {
		ImagePicker.openCamera(pickerOption).then(image => {
			changeProfilePicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const onChangeProfilePictureDropdown = (value) => {
		switch (value) {
			case 'TAKE_PHOTO':
				openCamera();
				break;
			case 'CHOOSE_FROM_LIBRARY':
				openLibrary();
				break;
			case 'DELETE_PROFILE_PICTURE':
				deleteProfilePicture();
				break;
			default:
				console.log('Error!');
				break;
		}
	};

	const toggleAllowOthersAddByID = async () => {
		showSpinner();
		try {
			const body = {
				'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			};
			const result = await put(`/users/${profileData.id}/searchable`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateProfile({
						...profileData,
						allowOthersAddByID: !profileData.allowOthersAddByID
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	// const appSettingsDummy = {
	// 	darkMode: false
	// };

	// const [appSettings, setAppSettings] = useState(appSettingsDummy);

	// const toggleDarkMode = () => {
	// 	setAppSettings({
	// 		...appSettings,
	// 		darkMode: !appSettings.darkMode
	// 	});
	// 	alert(`Toggle dark mode: ${appSettings.darkMode}`);
	// };

	// TODO: fix this
	const changePassword = async (currentPassword, newPassword) => {
		try {
			// const body = {
			// 	'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			// };
			// const result = await put(`/users/${profileData.id}/searchable`, body);
			// console.log(result);
			// setProfileData({
			// 	...profileData,
			// 	allowOthersAddByID: !profileData.allowOthersAddByID
			// });
		} catch(error) {
			console.log(error.stack);
		};
		alert(`Change password, current password: ${currentPassword} ; new password: ${newPassword}`);
	};

	const signOut = async () => {
		showSpinner();
		try {
			const ipAddress = await publicIP();
			const result = await del(`/users/${profileData.id}/login-token?ip-address=${ipAddress}`);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					navigation.reset({
						index: 0,
						routes: [{name: 'Dashboard'}],
					});
					clearUserData();
				};
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	// TODO: fix this
	const deleteAccount = async (password) => {
		try {
			clearUserData();
			// const body = {
			// 	'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			// };
			// const result = await put(`/users/${profileData.id}/searchable`, body);
			// console.log(result);
			// setProfileData({
			// 	...profileData,
			// 	allowOthersAddByID: !profileData.allowOthersAddByID
			// });
		} catch(error) {
			console.log(error.stack);
		};
	};

	return (
		<MyProfile
			scrollRef={scrollRef}
			contentText={translations['MyProfile']}
			confirmSignOutText={translations['ConfirmSignOut']}
			confirmDeleteAccountText={translations['ConfirmDeleteAccount']}
			profileData={profileData}
			changeProfileData={changeProfileData}
			toggleAllowOthersAddByID={toggleAllowOthersAddByID}
			// toggleDarkMode={toggleDarkMode}
			// appSettings={appSettings}
			languageList={translations.getAvailableLanguages()}
			languageContext={translations['Language']}
			dropdownLanguageContext={translations['DropdownLanguage']}
			dropdownChangePictureContext={translations['DropdownChangePicture']}
			currentLanguage={appLanguage}
			languageIcons={languageIcons}
			setLanguage={setAppLanguage}
			onChangeProfilePictureDropdown={onChangeProfilePictureDropdown}
			changePassword={changePassword}
			signOut={signOut}
			deleteAccount={deleteAccount} />
	);
};

export default MyProfilePage;