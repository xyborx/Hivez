import React, {useContext, useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {isRequestDescriptionValid} from '../../utils/validator.utils';
import {sum, where} from '../../utils/query.utils';
import CreateEventRequest from '../../components/Event/CreateEventRequest.component';
import {get, post} from '../../utils/api.utils';

const CreateEventRequestPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [eventMember, setEventMember] = useState([]);
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
					if (eventMember.length === 0) {
						await initializeEventData(eventID, userData.id);
						const members = await get(`/events/${eventID}/members`);
						setEventMember(members['output_schema'].map(item => {
							return {
								id: item['user_id'],
								image: item['user_picture'],
								joinDate: item['join_date'],
								name: item['full_name'],
								role: item['role'],
								username: item['user_name'],
								expense: 0
							}
						}));
					}
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [eventID])
	);

	const validateNextButton = (value, date, time, description, eventMember) => {
		setNextButtonAccessbility(value !== '' &&
			date !== '' &&
			time != '' &&
			isRequestDescriptionValid(description).isValid &&
			(Math.round(sum(eventMember, 'expense')) == value));
	};

	const onChangeValue = (value) => {
		setValue(value);
		validateNextButton(value, date, time, description, eventMember);
	};

	const onChangeDate = (date) => {
		setDate(date);
		validateNextButton(value, date, time, description, eventMember);
	};

	const onChangeTime = (time) => {
		setTime(time);
		validateNextButton(value, date, time, description, eventMember);
	};

	const onChangeDescription = (description) => {
		setDescription(description);
		validateNextButton(value, date, time, description, eventMember);
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

	const selectPayee = () => {
		navigation.navigate('SelectRequestPayee', {eventID: eventID, payeeList: eventMember, maxExpense: value});
	};

	const createEventRequest = async () => {
		showSpinner();
		try {
			const payeeList = where(eventMember, 'expense', item => item !== 0).map(item => ({'payee_user_id': item.id, 'amount': item.expense}));
			const body = {
				'requester_user_id': userData.id,
				'source_id': eventID,
				'source_type': 'EVENT',
				'request_description': description,
				'request_amount': value,
				'request_type': 'EXPENSE',
				'receipt_picture': image,
				'request_date': `${createDate(date).format('YYYY-MM-DD')} ${createDate(time).format('HH:mm:ss.SSSZ')}`,
				'request_payee': payeeList
			};
			const result = await post(`/requests`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') {
					setEventMember([]);
					setValue('');
					setDate(currentDate);
					setTime(currentDate);
					setDescription('');
					setImage('');
					navigation.navigate('EventDetail');
				}
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
	};

	useEffect(() => {
		if (route.params?.payeeList) {
			setEventMember(route.params?.payeeList);
			validateNextButton(value, date, time, description, route.params?.payeeList);
		}
	}, [route.params?.payeeList]);

	return (
		<CreateEventRequest
			contentText={translations['CreateEventRequest']}
			descriptionText={translations['RequestDescriptionValidation']}
			eventDetail={eventData}
			eventMember={eventMember}
			value={value}
			setValue={onChangeValue}
			date={date}
			setDate={onChangeDate}
			time={time}
			setTime={onChangeTime}
			description={description}
			setDescription={onChangeDescription}
			validateDescription={isRequestDescriptionValid}
			selectPayee={selectPayee}
			image={image}
			nextButtonAccessbility={nextButtonAccessbility}
			confirmCreateText={translations['ConfirmCreateEventRequest']}
			dropdownChangePictureContext={translations['DropdownChangePicture']}
			onChangeImageDropdown={onChangeImageDropdown}
			openDrawer={openDrawer}
			goBack={goBack}
			createEventRequest={createEventRequest} />
	);
};

export default CreateEventRequestPage;