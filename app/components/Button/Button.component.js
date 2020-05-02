import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import styles from './Button.component.style';

const Button = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={0.25}
			disabled={!props.accessability}
			onPress={props.onPress}
			style={[props.accessability ? styles.default : styles.disabled, props.style]}
			underlayColor={props.customUnderlayColor ? props.customUnderlayColor : '#FFC60B'}>
			<Text style={[styles.text, props.accessability ? {} : styles.textDisabled]}>{props.text}</Text>
		</TouchableHighlight>
	); 
}

export default Button;