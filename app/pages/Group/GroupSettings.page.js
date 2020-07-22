import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import ImagePicker from 'react-native-image-crop-picker';
import GroupSettings from '../../components/Group/GroupSettings.component';
import {get, put, del} from '../../utils/api.utils';

const GroupSettingsPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData, updateGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [groupMembers, setGroupMembers] = useState([]);

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeGroupData(groupID, userData.id);
				const members = await get(`/groups/${groupID}/members`);
				setGroupMembers(members['output_schema'].map(item => {
					return {
						id: item['user_id'],
						image: item['user_picture'],
						joinDate: item['join_date'],
						name: item['full_name'],
						role: item['role'],
						username: item['user_name']
					}
				}));
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const changeGroupData = async (groupName, groupDescription) => {
		showSpinner();
		try {
			const body = {
				'group_name': groupName,
				'group_description': groupDescription
			};
			const result = await put(`/groups/${groupID}/detail`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateGroupData({
						...groupData,
						name: groupName,
						description: groupDescription
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const changeGroupPicture = async (image) => {
		showSpinner();
		try {
			const body = {
				'group_picture': image.data
			};
			const result = await put(`/groups/${groupID}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					await ImagePicker.clean();
					updateGroupData({
						...groupData,
						image: image.data
					});
				}
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const deleteProfilePicture = async () => {
		showSpinner();
		try {
			const body = {
				'group_picture': ''
			};
			const result = await put(`/groups/${groupID}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateGroupData({
						...groupData,
						image: ''
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
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
			changeGroupPicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const openCamera = () => {
		ImagePicker.openCamera(pickerOption).then(image => {
			changeGroupPicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const onChangeGroupPictureDropdown = (value) => {
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

	const toggleAllowSearchByName = async () => {
		showSpinner();
		try {
			const currentState = groupData.allowSearchByName;
			const body = {
				'is_searchable': currentState ? 'N' : 'Y'
			};
			const result = await put(`/groups/${groupID}/searchable`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateGroupData({
						...groupData,
						allowSearchByName: !currentState
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const editGroupMember = () => {
		navigation.navigate('EditGroupMember', {
			groupID: groupID
		});
	};

	// TODO: Fix this
	const createEvent = async () => {
		alert('Unhandled event');
	};

	// TODO: Fix this
	const leaveGroup = async () => {
		navigation.replace('GroupList');
		alert(`Leave group ${groupID}`);
	};

	// TODO: Fix this
	const deleteGroup = async () => {
		navigation.replace('GroupList');
		alert(`Delete group ${groupID}`);
	};

	return (
		<GroupSettings
			contentText={translations['GroupSettings']}
			confirmLeaveGroupText={translations['ConfirmLeaveGroup']}
			confirmDeleteGroupText={translations['ConfirmDeleteGroup']}
			dropdownChangePictureText={translations['DropdownChangePicture']}
			groupData={groupData}
			groupMembers={groupMembers}
			currentUser={userData.id}
			onChangeGroupPictureDropdown={onChangeGroupPictureDropdown}
			toggleAllowSearchByName={toggleAllowSearchByName}
			changeGroupData={changeGroupData}
			editGroupMember={editGroupMember}
			createEvent={createEvent}
			leaveGroup={leaveGroup}
			deleteGroup={deleteGroup}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupSettingsPage;