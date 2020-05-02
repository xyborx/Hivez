import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import PasswordField from '../TextField/PasswordField.component';
import styles from './ConfirmWithPasswordModal.component.style';

const ConfirmWithPasswordModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [password, setPassword] = useState('');

	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(false);

	const onChangePassword = (password) => {
		setPassword(password);
		if (password.length > 0) setSaveButtonAccessbility(true);
		else setSaveButtonAccessbility(false);
	}

	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {
		setVisibility(!visibility);
		setPassword('');
		setSaveButtonAccessbility(false);
	};
	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
				<Text style={styles.content}>{props.contentText['PAGE_DETAILS']}</Text>
				<Text style={styles.content}>{props.contentText['PAGE_INSTRUCTIONS']}</Text>
				<PasswordField
					contentText={translations['PasswordValidation']}
					onChangeText={onChangePassword}
					placeholder={props.contentText['PASSWORD_PLACEHOLDER']}
					value={password} />
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={props.contentText['NO']} />
					<Button
						accessability={saveButtonAccessbility}
						onPress={() => {
							toggleModal();
							props.action(password);
						}}
						style={styles.button}
						text={props.contentText['YES']} />
				</View>
		</Modal>
	);
};

export default ConfirmWithPasswordModal;