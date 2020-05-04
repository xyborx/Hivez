import React from 'react';
import {TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './TextFieldNoValidation.component.style';

const TextFieldNoValidation = (props) => {
	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.iconContainer}>
				<FontAwesome5 name={props.textIcon} style={styles.inputIcon} />
			</View>
			<TextInput
				autoCapitalize={'words'}
				editable={props.editable}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder}
				style={styles.textInput}
				value={props.value} />
		</View>
	);
}

export default TextFieldNoValidation;