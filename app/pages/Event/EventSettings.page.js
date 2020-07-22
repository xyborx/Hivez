import React, {useCallback, useContext, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import ImagePicker from 'react-native-image-crop-picker';
import EventSettings from '../../components/Event/EventSettings.component';
import {get, put, del} from '../../utils/api.utils';

const EventSettingsPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData, updateEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventMembers, setEventMembers] = useState([]);

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				await initializeEventData(eventID, userData.id);
				const members = await get(`/events/${eventID}/members`);
				setEventMembers(members['output_schema'].map(item => {
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

	const changeEventData = async (eventName, eventDescription) => {
		showSpinner();
		try {
			const body = {
				'event_name': eventName,
				'event_description': eventDescription
			};
			const result = await put(`/events/${eventID}/detail`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateEventData({
						...eventData,
						name: eventName,
						description: eventDescription
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const changeEventPicture = async (image) => {
		showSpinner();
		try {
			const body = {
				'event_picture': image.data
			};
			const result = await put(`/events/${eventID}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					await ImagePicker.clean();
					updateEventData({
						...eventData,
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
				'event_picture': ''
			};
			const result = await put(`/events/${eventID}/picture`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateEventData({
						...eventData,
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
			changeEventPicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const openCamera = () => {
		ImagePicker.openCamera(pickerOption).then(image => {
			changeEventPicture(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const onChangeEventPictureDropdown = (value) => {
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
			const currentState = eventData.allowSearchByName;
			const body = {
				'is_searchable': currentState ? 'N' : 'Y'
			};
			const result = await put(`/events/${eventID}/searchable`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					updateEventData({
						...eventData,
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
		navigation.replace('EventList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const editEventMember = () => {
		navigation.navigate('EditEventMember', {
			eventID: eventID
		});
	};

	// TODO: Fix this
	const leaveEvent = async () => {
		navigation.replace('EventList');
		alert(`Leave event ${eventID}`);
	};

	// TODO: Fix this
	const deleteEvent = async () => {
		navigation.replace('EventList');
		alert(`Delete event ${eventID}`);
	};

	return (
		<EventSettings
			contentText={translations['EventSettings']}
			confirmLeaveEventText={translations['ConfirmLeaveEvent']}
			confirmDeleteEventText={translations['ConfirmDeleteEvent']}
			dropdownChangePictureText={translations['DropdownChangePicture']}
			eventData={eventData}
			eventMembers={eventMembers}
			onChangeEventPictureDropdown={onChangeEventPictureDropdown}
			toggleAllowSearchByName={toggleAllowSearchByName}
			changeEventData={changeEventData}
			editEventMember={editEventMember}
			leaveEvent={leaveEvent}
			deleteEvent={deleteEvent}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default EventSettingsPage;