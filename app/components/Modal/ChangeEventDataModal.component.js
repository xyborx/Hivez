import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {isEventNameValid} from '../../utils/validator.utils';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import TextField from '../TextField/TextField.component';
import styles from './ChangeEventDataModal.component.style';

const ChangeEventDataModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {setVisibility(!visibility)};

	const [eventName, setEventName] = useState(props.data.name);
	const [eventDescription, setEventDescription] = useState(props.data.description);

	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(true);

	const validateSaveButton = (eventName) => {
		setSaveButtonAccessbility(isEventNameValid(eventName).isValid);
	};

	const onChangeEventName = (eventName) => {
		setEventName(eventName);
		validateSaveButton(eventName);
	};

	const onChangeEventDescription = (eventDescription) => {
		setEventDescription(eventDescription);
	};

	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{translations['ChangeEventDataModal']['PAGE_TITLE']}</Text>
				<TextField
					contentText={translations['EventNameValidation']}
					textIcon={'address-card'}
					customValidateInput={isEventNameValid}
					onChangeText={onChangeEventName}
					placeholder={translations['ChangeEventDataModal']['EVENT_NAME_PLACEHOLDER']}
					style={styles.inputText}
					validateInput={true}
					value={eventName} />
				<TextField
					contentText={translations['EventNameValidation']}
					onChangeText={onChangeEventDescription}
					textIcon={'sticky-note'}
					placeholder={translations['ChangeEventDataModal']['EVENT_DESCRIPTION_PLACEHOLDER']}
					validateInput={false}
					value={eventDescription} />
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={() => {
							toggleModal();
							setEventName(props.data.name);
							setEventDescription(props.data.description);
						}}
						style={[styles.button, styles.cancelButton]}
						text={translations['ChangeEventDataModal']['CANCEL']} />
					<Button
						accessability={saveButtonAccessbility}
						onPress={() => {
							toggleModal();
							props.saveData(eventName, eventDescription);
						}}
						style={styles.button}
						text={translations['ChangeEventDataModal']['SAVE']} />
				</View>
		</Modal>
	);
};

export default ChangeEventDataModal;