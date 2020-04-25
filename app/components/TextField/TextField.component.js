import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './TextField.component.style';

const TextField = (props) => {
	return (
		<View>
			<View style={[props.validity ? styles.container : styles.containerInvalid, props.style]}>
				<TextInput
				editable={props.editable}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder}
				value={props.value} />
			</View>
			<Text style={!props.validity ? styles.errorMessage : styles.hidden}>{props.errorMessage}</Text>
		</View>
	);
}

export default TextField;