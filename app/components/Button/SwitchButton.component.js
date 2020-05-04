import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import styles from './SwitchButton.component.style';

const SwitchButton = (props) => {
	const [value, setValue] = useState(props.value);

	const changeValue = (newValue) => {
		setValue(newValue);
		props.onChange(newValue);
	};

	return (
		<View style={[styles.container, props.style]}>
			<TouchableHighlight
				activeOpacity={0.25}
				disabled={value === props.leftValue}
				onPress={() => {changeValue(props.leftValue)}}
				style={[styles.default, value === props.leftValue ? {} : styles.disabled]}
				underlayColor={value === props.leftValue ? '#FFC60B' : '#DEDEDE'}>
				<Text style={[styles.text, value === props.leftValue ? {} : styles.textDisabled]}>{props.text[props.leftValue]}</Text>
			</TouchableHighlight>
			<TouchableHighlight
				activeOpacity={0.25}
				disabled={value === props.rightValue}
				onPress={() => {changeValue(props.rightValue)}}
				style={[styles.default, value === props.rightValue ? {} : styles.disabled]}
				underlayColor={value === props.rightValue ? '#FFC60B': '#DEDEDE'}>
				<Text style={[styles.text, value === props.rightValue ? {} : styles.textDisabled]}>{props.text[props.rightValue]}</Text>
			</TouchableHighlight>
		</View>
	); 
}

export default SwitchButton;