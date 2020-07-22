import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillPayment from '../../components/Group/GroupBillPayment.component';
import {get, post} from '../../utils/api.utils';

const GroupBillPaymentPage = ({route, navigation}) => {
	const {billID, groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [billDetail, setBillDetail] = useState({
		id: billID,
		value: rupiahFormatting(0, false),
		description: ''
	});
	const [date, setDate] = useState(currentDate);
	const [time, setTime] = useState(currentDate);
	const [image, setImage] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(true);

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeGroupData(groupID, userData.id);
					const billData = await get(`/bills/${billID}/detail`);
					setBillDetail({
						id: billData['output_schema']['bill_id'],
						description: billData['output_schema']['bill_description'],
						value: rupiahFormatting(billData['output_schema']['bill_amount'], false)
					});
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const validateNextButton = (date, time) => {
		setNextButtonAccessbility(date !== '' && time != '');
	};

	const onChangeDate = (date) => {
		setDate(date);
		validateNextButton(date, time);
	};

	const onChangeTime = (time) => {
		setTime(time);
		validateNextButton(date, time);
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

	const payBill = async () => {
		showSpinner();
		try {
			const body = {
				'bill_id': billID,
				'payer_user_id': userData.id,
				'receipt_picture': image,
				'request_date': `${createDate(date).format('YYYY-MM-DD')} ${createDate(time).format('HH:mm:ss.SSSZ')}`
			};
			const result = await post(`/bills/payments`, body);
			if (result === null) showPopUp('No Connection');
			else {
				if (result['error_schema']['error_code'] === 'HIVEZ-000-0000') navigation.pop();
				showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
			}
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillPayment
			contentText={translations['GroupBillPayment']}
			groupDetail={groupData}
			billDetail={billDetail}
			date={date}
			setDate={onChangeDate}
			time={time}
			setTime={onChangeTime}
			image={image}
			nextButtonAccessbility={nextButtonAccessbility}
			dropdownChangePictureContext={translations['DropdownChangePicture']}
			onChangeImageDropdown={onChangeImageDropdown}
			confirmPayText={translations['ConfirmGroupBillPayment']}
			payBill={payBill}
			goBack={goBack} />
	);
};

export default GroupBillPaymentPage;