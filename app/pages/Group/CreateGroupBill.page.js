import React, {useContext, useState} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {isBillDescriptionValid} from '../../utils/validator.utils';
import CreateGroupBill from '../../components/Group/CreateGroupBill.component';
import {post} from '../../utils/api.utils';

const CreateGroupBillPage = ({route, navigation}) => {
	const {groupID} = route.params;
	
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
	const [value, setValue] = useState('');
	const [description, setDescription] = useState('');
	const [nextButtonAccessbility, setNextButtonAccessbility] = useState(false);

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

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
		try {
			const body = {
				'creator_user_id': userID,
				'group_id': groupID,
				'bill_description': description,
				'bill_amount': value
			};
			const result = await post(`/bills`, body);
			console.log(result);
			navigation.pop();
		} catch(error) {
			console.log(error.stack);
		};
	};

	const goBack = () => {
		navigation.pop();
	}

	return (
		<CreateGroupBill
			contentText={translations['CreateGroupBill']}
			descriptionText={translations['BillDescriptionValidation']}
			groupDetail={groupDetail}
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