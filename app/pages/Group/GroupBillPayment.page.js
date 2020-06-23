import React, {useContext, useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupBillPayment from '../../components/Group/GroupBillPayment.component';
import {get, post} from '../../utils/api.utils';

const GroupBillPaymentPage = ({route, navigation}) => {
	const {billID, groupID} = route.params;

	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});

	const [billDetail, setBillDetail] = useState({
		id: billID,
		value: rupiahFormatting(0, false),
		description: ''
	});
	const [date, setDate] = useState(currentDate);
	const [time, setTime] = useState(currentDate);
	const [image, setImage] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(true);

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const billData = await get(`/bills/${billID}/detail`);
				setBillDetail({
					id: billData['output_schema']['bill_id'],
					description: billData['output_schema']['bill_description'],
					value: rupiahFormatting(billData['output_schema']['bill_amount'], false)
				});
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

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
		try {
			const body = {
				'bill_id': billID,
				'payer_user_id': userID,
				'receipt_picture': image,
				'request_date': `${createDate(date).format('YYYY-MM-DD')} ${createDate(time).format('HH:mm:ss.SSSZ')}`
			};
			const result = await post(`/bills/payments`, body);
			console.log(result);
			navigation.pop();
		} catch(error) {
			console.log(error.stack);
		};
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<GroupBillPayment
			contentText={translations['GroupBillPayment']}
			groupDetail={groupDetail}
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