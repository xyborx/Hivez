import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './TextField.component.style';

const TextField = (props) => {
	const [validity, setValidity] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	return (
		<View style={[props.accessbility ? {} : styles.hidden, props.style]}>
			<View style={validity ? styles.container : styles.containerInvalid}>
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
					value={props.value} />
			</View>
			<Text style={!validity ? styles.errorMessage : styles.hidden}>{props.contentText[errorMessage]}</Text>
		</View>
	);
}

export default TextField;