import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './EmailField.component.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EmailField = (props) => {
	return (
		<View style={props.style}>
			<View style={ props.editable ? [props.validity ? styles.inputText : styles.inputTextInvalid, styles.container] :
				[styles.containerDisabled, styles.container, props.style]}>
				<TextInput
					editable={props.editable}
					onChangeText={props.onChangeText}
					placeholder={props.placeholder}
					style={[props.editable ? {} : styles.inputTextDisabled, styles.textInput]}
					value={props.value} />
				<TouchableOpacity
					style={props.editable ? styles.hidden : styles.toggleButton}
					onPress={props.onPressPasswordToggle} >
					<FontAwesome5 name={'edit'} style={styles.toggleIcon} />
				</TouchableOpacity>
			</View>
			<Text style={props.editable && !props.validity ? styles.errorMessage : styles.hidden}>{props.errorMessage}</Text>
		</View>
	);
}

export default EmailField;