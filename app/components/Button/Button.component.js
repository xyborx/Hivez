import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Button.component.style';

const Button = (props) => {
	return (
		<TouchableOpacity
			style={[props.accessability ? styles.default : styles.disabled, props.style]}
			disabled={!props.accessability}
			onPress={props.onPress}
			underlayColor="white">
			<Text style={styles.text}>{props.text}</Text>
		</TouchableOpacity>
	); 
}

export default Button;