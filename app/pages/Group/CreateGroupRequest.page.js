import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {isRequestDescriptionValid} from '../../utils/validator.utils';
import CreateGroupRequest from '../../components/Group/CreateGroupRequest.component';
import {post} from '../../utils/api.utils';

const CreateGroupRequestPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [type, setType] = useState('EXPENSE');
	const [value, setValue] = useState('');
	const [date, setDate] = useState(currentDate);
	const [time, setTime] = useState(currentDate);
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					await initializeGroupData(groupID, userData.id);
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const validateNextButton = (value, date, time, description) => {
		setNextButtonAccessbility(value !== '' && date !== '' && time != '' && isRequestDescriptionValid(description).isValid);
	};

	const onChangeType = (type) => {
		setType(type);
	};

	const onChangeValue = (value) => {
		setValue(value);
		validateNextButton(value, date, time, description);
	};

	const onChangeDate = (date) => {
		setDate(date);
		validateNextButton(value, date, time, description);
	};

	const onChangeTime = (time) => {
		setTime(time);
		validateNextButton(value, date, time, description);
	};

	const onChangeDescription = (description) => {
		setDescription(description);
		validateNextButton(value, date, time, description);
	};

	const changeImage = (image) => {
		setImage(image.data);
		ImagePicker.clean().then(() => {
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
		cropperToolbarTitle: translations['DropdownChangePicture']['SELECT_PROFILE_PICTURE'],
		includeBase64: true,
		mediaType: 'photo'
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

	const createGroupRequest = async () => {
		showSpinner();
		try {
			const body = {
				'requester_user_id': userData.id,
				'source_id': groupID,
				'source_type': 'GROUP',
				'request_description': description,
				'request_amount': value,
				'request_type': type,
				'receipt_picture': image,
				'request_date': `${createDate(date).format('YYYY-MM-DD')} ${createDate(time).format('HH:mm:ss.SSSZ')}`
			};
			const result = await post(`/requests`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') navigation.navigate('GroupDetail');
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			};
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const goBack = () => {
		navigation.pop();
	}

	return (
		<CreateGroupRequest
			contentText={translations['CreateGroupRequest']}
			descriptionText={translations['RequestDescriptionValidation']}
			groupDetail={groupData}
			type={type}
			setType={onChangeType}
			value={value}
			setValue={onChangeValue}
			date={date}
			setDate={onChangeDate}
			time={time}
			setTime={onChangeTime}
			description={description}
			setDescription={onChangeDescription}
			validateDescription={isRequestDescriptionValid}
			image={image}
			nextButtonAccessbility={nextButtonAccessbility}
			confirmCreateText={translations['ConfirmCreateGroupRequest']}
			dropdownChangePictureContext={translations['DropdownChangePicture']}
			onChangeImageDropdown={onChangeImageDropdown}
			openDrawer={openDrawer}
			goBack={goBack}
			createGroupRequest={createGroupRequest} />
	);
};

export default CreateGroupRequestPage;