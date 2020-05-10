import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {isGroupNameValid} from '../../utils/validator.utils';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import TextField from '../TextField/TextField.component';
import styles from './ChangeGroupDataModal.component.style';

const ChangeGroupDataModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {setVisibility(!visibility)};

	const [groupName, setGroupName] = useState(props.data.name);
	const [groupDescription, setGroupDescription] = useState(props.data.description);

	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(true);

	const validateSaveButton = (groupName) => {
		setSaveButtonAccessbility(isGroupNameValid(groupName).isValid);
	};

	const onChangeGroupName = (groupName) => {
		setGroupName(groupName);
		validateSaveButton(groupName);
	};

	const onChangeGroupDescription = (groupDescription) => {
		setGroupDescription(groupDescription);
	};

	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{translations['ChangeGroupDataModal']['PAGE_TITLE']}</Text>
				<TextField
					contentText={translations['GroupNameValidation']}
					textIcon={'address-card'}
					customValidateInput={isGroupNameValid}
					onChangeText={onChangeGroupName}
					placeholder={translations['ChangeGroupDataModal']['GROUP_NAME_PLACEHOLDER']}
					style={styles.inputText}
					validateInput={true}
					value={groupName} />
				<TextField
					contentText={translations['GroupNameValidation']}
					onChangeText={onChangeGroupDescription}
					textIcon={'sticky-note'}
					placeholder={translations['ChangeGroupDataModal']['GROUP_DESCRIPTION_PLACEHOLDER']}
					validateInput={false}
					value={groupDescription} />
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={translations['ChangeGroupDataModal']['CANCEL']} />
					<Button
						accessability={saveButtonAccessbility}
						onPress={() => {
							toggleModal();
							props.saveData(groupName, groupDescription);
						}}
						style={styles.button}
						text={translations['ChangeGroupDataModal']['SAVE']} />
				</View>
		</Modal>
	);
};

export default ChangeGroupDataModal;