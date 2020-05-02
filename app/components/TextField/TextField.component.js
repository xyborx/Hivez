import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './TextField.component.style';

const TextField = (props) => {
	const [validity, setValidity] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	return (
		<View style={props.style}>
			<View style={[validity ? styles.inputText : styles.containerInvalid, styles.container]}>
				<View style={styles.iconContainer}>
					<FontAwesome5 name={props.textIcon} style={styles.inputIcon} />
				</View>
				<TextInput
					autoCapitalize={'words'}
					editable={props.editable}
					onChangeText={(value) => {
						props.onChangeText(value);
						if (props.validateInput && props.customValidateInput) {
							const validationResult = props.customValidateInput(value);
							setValidity(value.length > 0 ? validationResult.isValid : true);
							setErrorMessage(value.length > 0 ? validationResult.message : '');
						}
					}}
					placeholder={props.placeholder}
					style={styles.textInput}
					value={props.value} />
			</View>
			<Text style={!validity ? styles.errorMessage : styles.hidden}>{props.contentText[errorMessage]}</Text>
		</View>
	);
}

export default TextField;