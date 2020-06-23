import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import ImagePicker from 'react-native-image-crop-picker';
import EventSettings from '../../components/Event/EventSettings.component';
import {get, put, del} from '../../utils/api.utils';

const EventSettingsPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [eventData, setEventData] = useState({
		id: eventID,
		image: '',
		name: '',
		description: '',
		allowSearchByName: false
	});
	const [eventMembers, setEventMembers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await get(`/events/${eventID}/detail`);
				const image = await get(`/events/${eventID}/picture`);
				setEventData({
					id: eventID,
					image: image['output_schema']['event_picture'],
					name: data['output_schema']['event_name'],
					description: data['output_schema']['event_description'],
					allowSearchByName: data['output_schema']['is_searchable'] === 'Y' ? true : false
				});
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
		};
		fetchData();
	}, []);

	const changeEventData = async (eventName, eventDescription) => {
		try {
			const body = {
				'event_name': eventName,
				'event_description': eventDescription
			};
			const result = await put(`/events/${eventID}/detail`, body);
			console.log(result);
			setEventData({
				...eventData,
				name: eventName,
				description: eventDescription
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const changeEventPicture = async (image) => {
		try {
			const body = {
				'event_picture': image.data
			};
			const result = await put(`/events/${eventID}/picture`, body);
			console.log(result);
			await ImagePicker.clean();
			setEventData({
				...eventData,
				image: image.data
			});
		} catch(error) {
			console.log(error.stack);
		};
	};

	const deleteProfilePicture = async () => {
		try {
			const body = {
				'event_picture': ''
			};
			const result = await put(`/events/${eventID}/picture`, body);
			console.log(result);
			setEventData({
				...eventData,
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
		try {
			const body = {
				'is_searchable': eventData.allowSearchByName ? 'N' : 'Y'
			};
			const result = await put(`/events/${eventID}/searchable`, body);
			console.log(result);
			setEventData({
				...eventData,
				allowOthersAddByID: !eventData.allowSearchByName
			});
		} catch(error) {
			console.log(error.stack);
		};
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