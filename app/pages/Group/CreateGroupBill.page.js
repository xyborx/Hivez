import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {isBillDescriptionValid} from '../../utils/validator.utils';
import CreateGroupBill from '../../components/Group/CreateGroupBill.component';
import {post} from '../../utils/api.utils';

const CreateGroupBillPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [value, setValue] = useState('');
	const [description, setDescription] = useState('');
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

	const validateNextButton = (value, description) => {
		setNextButtonAccessbility(value !== '' && isBillDescriptionValid(description).isValid);
	};

	const onChangeValue = (value) => {
		setValue(value);
		validateNextButton(value, description);
	};

	const onChangeDescription = (description) => {
		setDescription(description);
		validateNextButton(value, description);
	};

	const createGroupBill = async () => {
		showSpinner();
		try {
			const body = {
				'creator_user_id': userID,
				'group_id': groupID,
				'bill_description': description,
				'bill_amount': value
			};
			const result = await post(`/bills`, body);
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

	const goBack = () => {
		navigation.pop();
	}

	return (
		<CreateGroupBill
			contentText={translations['CreateGroupBill']}
			descriptionText={translations['BillDescriptionValidation']}
			groupDetail={groupData}
			value={value}
			setValue={onChangeValue}
			description={description}
			setDescription={onChangeDescription}
			validateDescription={isBillDescriptionValid}
			nextButtonAccessbility={nextButtonAccessbility}
			confirmCreateText={translations['ConfirmCreateGroupBill']}
			goBack={goBack}
			createGroupBill={createGroupBill} />
	);
};

export default CreateGroupBillPage;