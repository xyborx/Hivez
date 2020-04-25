import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './PasswordField.component.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PasswordField = (props) => {
	return (
		<View style={[props.accessbility ? {} : styles.hidden, props.style]}>
			<View style={[props.validity ? styles.inputText : styles.inputTextInvalid, styles.container]}>
				<TextInput
					onChangeText={props.onChangeText}
					placeholder={props.placeholder}
					style={styles.textInput}
					value={props.value}
					secureTextEntry={!props.visibility} />
				<TouchableOpacity
					style={styles.toggleButton}
					onPress={props.onPressPasswordToggle} >
					<FontAwesome5 name={props.visibility ? 'eye-slash' : 'eye'} style={styles.toggleIcon} />
				</TouchableOpacity>
			</View>
			<Text style={!props.validity ? styles.errorMessage : styles.hidden}>{props.errorMessage}</Text>
		</View>
	);
}

export default PasswordField;