import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {isPasswordValid, isConfirmPasswordMatch, isNewPasswordValid} from '../../utils/validator.utils';
import {LocalizationContext} from '../../contexts/language.context';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import PasswordField from '../TextField/PasswordField.component';
import styles from './ChangePasswordModal.component.style';

const ChangePasswordModal = (props) => {
	const {translations} = useContext(LocalizationContext);
	

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const checkConfirmPassword = (confirmNewPassword) => {
		return isConfirmPasswordMatch(newPassword, confirmNewPassword);
	}

	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(false);

	const validateSaveButton = (currentPassword, newPassword, confirmNewPassword) => {
		setSaveButtonAccessbility(currentPassword.length > 0 &&
			isPasswordValid(newPassword).isValid &&
			isConfirmPasswordMatch(newPassword, confirmNewPassword).isValid &&
			isNewPasswordValid(currentPassword, newPassword).isValid);
	};

	const onChangeCurrentPassword = (currentPassword) => {
		setCurrentPassword(currentPassword);
		validateSaveButton(currentPassword, newPassword, confirmNewPassword);
	}

	const onChangeNewPassword = (newPassword) => {
		setNewPassword(newPassword);
		validateSaveButton(currentPassword, newPassword, confirmNewPassword);
	}

	const onChangeConfirmMewPassword = (confirmNewPassword) => {
		setConfirmNewPassword(confirmNewPassword);
		validateSaveButton(currentPassword, newPassword, confirmNewPassword);
	}

	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {
		setVisibility(!visibility);
		setCurrentPassword('');
		setNewPassword('');
		setConfirmNewPassword('');
		setSaveButtonAccessbility(false);
	};

	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{translations['ChangePasswordModal']['PAGE_TITLE']}</Text>
				<PasswordField
					contentText={translations['PasswordValidation']}
					onChangeText={onChangeCurrentPassword}
					placeholder={translations['ChangePasswordModal']['CURRENT_PASSWORD_PLACEHOLDER']}
					style={styles.inputText}
					value={currentPassword} />
				<PasswordField
					contentText={translations['PasswordValidation']}
					onChangeText={onChangeNewPassword}
					placeholder={translations['ChangePasswordModal']['NEW_PASSWORD_PLACEHOLDER']}
					style={styles.inputText}
					validateInput={true}
					value={newPassword} />
				<PasswordField
					contentText={translations['PasswordValidation']}
					customValidateInput={checkConfirmPassword}
					onChangeText={onChangeConfirmMewPassword}
					placeholder={translations['ChangePasswordModal']['CONFIRM_NEW_PASSWORD_PLACEHOLDER']}
					style={styles.inputText}
					validateInput={true}
					value={confirmNewPassword} />
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={translations['ChangePasswordModal']['CANCEL']} />
					<Button
						accessability={saveButtonAccessbility}
						onPress={() => {
							props.saveData(currentPassword, newPassword);
							toggleModal();
						}}
						style={styles.button}
						text={translations['ChangePasswordModal']['SAVE']} />
				</View>
		</Modal>
	);
};

export default ChangePasswordModal;