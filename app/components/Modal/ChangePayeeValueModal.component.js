import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import NumberField from '../TextField/NumberField.component';
import styles from './ChangePayeeValueModal.component.style';

const ChangePayeeValueModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const [visibility, setVisibility] = useState(false);
	const [value, setValue] = useState(Number(props.value) > 0 ? Number(props.value) : '');
	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(Number(props.value) > 0);

	const onChangeValue = (newValue) => {
		setValue(newValue);
		setSaveButtonAccessbility(Number(newValue) > 0);
	};

	const toggleModal = () => {
		setVisibility(!visibility);
		setValue(Number(props.value) > 0 ? Number(props.value) : '');
		setSaveButtonAccessbility(Number(props.value) > 0);
	};

	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{translations['ChangePayeeValueModal']['PAGE_TITLE']}</Text>
				<NumberField
					onChangeText={onChangeValue}
					textStyle={styles.expense}
					style={styles.inputText}
					value={value} />
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={translations['ChangePayeeValueModal']['CANCEL']} />
					<Button
						accessability={saveButtonAccessbility}
						onPress={() => {
							toggleModal();
							props.saveData(value);
						}}
						style={styles.button}
						text={translations['ChangePayeeValueModal']['SAVE']} />
				</View>
		</Modal>
	);
};

export default ChangePayeeValueModal;