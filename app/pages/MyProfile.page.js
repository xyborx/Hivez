import React, {useContext, useRef, useState, useEffect} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {LocalizationContext} from '../utils/language.utils';
import {UserContext} from '../contexts/user.context';
import MyProfile from '../components/MyProfile/MyProfile.component';
import {get, put} from '../utils/api.utils';

const MyProfilePage = ({navigation}) => {
	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const [profileData, setProfileData] = useState({
		id: userID,
		image: '',
		fullName: '',
		email: '',
		username: '',
		allowOthersAddByID: false
	});
	
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	const {translations, appLanguage, setAppLanguage, initializeAppLanguage, languageIcons} = useContext(LocalizationContext);
	const {initializeUserData} = useContext(UserContext);

	initializeAppLanguage();
	initializeUserData(userID).then(result => setProfileData(result));

	const changeProfileData = async (fullName, email, username) => {
		try {
			const body = {
				'full_name': fullName,
				'email': email,
				'user_name': username
			};
			const result = await put(`/users/${userID}/profile`, body);
			console.log(result);
			setProfileData({
				...profileData,
				fullName: fullName,
				email: email,
				username: username
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const changeProfilePicture = async (image) => {
		try {
			const body = {
				'user_picture': image.data
			};
			const result = await put(`/users/${userID}/picture`, body);
			console.log(result);
			await ImagePicker.clean();
			setProfileData({
				...profileData,
				image: image.data
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const deleteProfilePicture = async () => {
		try {
			const body = {
				'user_picture': ''
			};
			const result = await put(`/users/${userID}/picture`, body);
			console.log(result);
			setProfileData({
				...profileData,
				image: ''
			});
		} catch(error) {
			console.log(error.stack);
		};
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
		try {
			const body = {
				'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			};
			const result = await put(`/users/${userID}/searchable`, body);
			console.log(result);
			setProfileData({
				...profileData,
				allowOthersAddByID: !profileData.allowOthersAddByID
			});
		} catch(error) {
			console.log(error.stack);
		};
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
			const body = {
				'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			};
			const result = await put(`/users/${userID}/searchable`, body);
			console.log(result);
			setProfileData({
				...profileData,
				allowOthersAddByID: !profileData.allowOthersAddByID
			});
		} catch(error) {
			console.log(error.stack);
		};
		alert(`Change password, current password: ${currentPassword} ; new password: ${newPassword}`);
	};

	// TODO: fix this
	const signOut = async () => {
		try {
			const body = {
				'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			};
			const result = await put(`/users/${userID}/searchable`, body);
			console.log(result);
			setProfileData({
				...profileData,
				allowOthersAddByID: !profileData.allowOthersAddByID
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	// TODO: fix this
	const deleteAccount = async (password) => {
		try {
			const body = {
				'is_searchable': profileData.allowOthersAddByID ? 'N' : 'Y'
			};
			const result = await put(`/users/${userID}/searchable`, body);
			console.log(result);
			setProfileData({
				...profileData,
				allowOthersAddByID: !profileData.allowOthersAddByID
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	return (
		<MyProfile
			scrollRef={scrollRef}
			userID={userID}
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