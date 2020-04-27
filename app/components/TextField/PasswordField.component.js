import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './PasswordField.component.style';
import {isPasswordValid} from '../../utils/helper.utils';

const PasswordField = (props) => {
	const [visibility, setVisibility] = useState(false);
	const [validity, setValidity] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	return (
		<View style={props.style}>
			<View style={[validity ? styles.inputText : styles.inputTextInvalid, styles.container]}>
				<TextInput
					autoCapitalize={'none'}
					onChangeText={(value) => {
						props.onChangeText(value);
						if (props.validateInput) {
							const validationResult = props.customValidateInput ? props.customValidateInput(value) : isPasswordValid(value);
							setValidity(value.length > 0 ? validationResult.isValid : true);
							setErrorMessage(value.length > 0 ? validationResult.message : '');
						}
					}}
					placeholder={props.placeholder}
					style={styles.textInput}
					value={props.value}
					secureTextEntry={!visibility} />
				<TouchableOpacity
					style={styles.toggleButton}
					onPress={() => {setVisibility(!visibility)}} >
					<FontAwesome5 name={visibility ? 'eye-slash' : 'eye'} style={styles.toggleIcon} />
				</TouchableOpacity>
			</View>
			<Text style={validity ? styles.hidden : styles.errorMessage}>{props.contentText[errorMessage]}</Text>
		</View>
	);
}

export default PasswordField;