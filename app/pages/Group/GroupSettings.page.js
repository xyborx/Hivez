import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import ImagePicker from 'react-native-image-crop-picker';
import GroupSettings from '../../components/Group/GroupSettings.component';
import {get, put, del} from '../../utils/api.utils';

const GroupSettingsPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: '',
		description: '',
		allowSearchByName: false
	});
	const [groupMembers, setGroupMembers] = useState([]);

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData, setGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
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
		};
		fetchData();
	}, []);

	const updateGroupData = (updatedGroupData) => {
		setGroupDetail(updatedGroupData);
		setGroupData(updatedGroupData);
	};

	const changeGroupData = async (groupName, groupDescription) => {
		try {
			const body = {
				'group_name': groupName,
				'group_description': groupDescription
			};
			const result = await put(`/groups/${groupID}/detail`, body);
			console.log(result);
			updateGroupData({
				...groupDetail,
				name: groupName,
				description: groupDescription
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const changeGroupPicture = async (image) => {
		try {
			const body = {
				'group_picture': image.data
			};
			const result = await put(`/groups/${groupID}/picture`, body);
			console.log(result);
			await ImagePicker.clean();
			updateGroupData({
				...groupDetail,
				image: image.data
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const deleteProfilePicture = async () => {
		try {
			const body = {
				'group_picture': ''
			};
			const result = await put(`/groups/${groupID}/picture`, body);
			console.log(result);
			updateGroupData({
				...groupDetail,
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
		try {
			const currentState = groupDetail.allowSearchByName;
			updateGroupData({
				...groupDetail,
				allowSearchByName: !currentState
			});
			const body = {
				'is_searchable': currentState ? 'N' : 'Y'
			};
			const result = await put(`/groups/${groupID}/searchable`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
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
			groupData={groupDetail}
			groupMembers={groupMembers}
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