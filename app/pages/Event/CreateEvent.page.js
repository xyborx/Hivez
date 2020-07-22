import React, {useContext, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {isEventNameValid} from '../../utils/validator.utils';
import CreateEvent from '../../components/Event/CreateEvent.component';
import {post} from '../../utils/api.utils';

const CreateEventPage = ({navigation}) => {
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);
	
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const onChangeName = (name) => {
		setName(name);
		setNextButtonAccessbility(isEventNameValid(name).isValid);
	};

	const onChangeDescription = (description) => {
		setDescription(description);
	};

	const changeImage = (image) => {
		ImagePicker.clean().then(() => {
			setImage(image.data);
		}).catch(e => {
			console.log(e);
		})
	};

	const deleteImage = () => {
		setImage('');
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
			changeImage(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const openCamera = () => {
		ImagePicker.openCamera(pickerOption).then(image => {
			changeImage(image);
		}).catch(e => {
			console.log(e);
		});
	};

	const onChangeImageDropdown = (value) => {
		switch (value) {
			case 'TAKE_PHOTO':
				openCamera();
				break;
			case 'CHOOSE_FROM_LIBRARY':
				openLibrary();
				break;
			case 'DELETE_PROFILE_PICTURE':
				deleteImage();
				break;
			default:
				console.log('Error!');
				break;
		}
	};

	const createEvent = async () => {
		showSpinner();
		try {
			const body = {
				'user_id': userData.id,
				'event_name': name,
				'event_description': description,
				'event_picture': image
			};
			const result = await post(`/events`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000')
					navigation.navigate('EventDrawer', {
						screen: 'EventDetail',
						initial: true,
						params: {eventID: result['output_schema']['event_id']}
					});
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const goBack = () => {
		navigation.pop();
	}

	return (
		<CreateEvent
			contentText={translations['CreateEvent']}
			eventNameText={translations['EventNameValidation']}
			image={image}
			name={name}
			validateName={isEventNameValid}
			setName={onChangeName}
			description={description}
			setDescription={onChangeDescription}
			nextButtonAccessbility={nextButtonAccessbility}
			confirmCreateText={translations['ConfirmCreateEvent']}
			dropdownChangePictureContext={translations['DropdownChangePicture']}
			onChangeImageDropdown={onChangeImageDropdown}
			goBack={goBack}
			createEvent={createEvent} />
	);
};

export default CreateEventPage;