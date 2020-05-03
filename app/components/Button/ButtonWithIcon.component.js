import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './ButtonWithIcon.component.style';

const ButtonWithIcon = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={0.25}
			disabled={!props.accessability}
			onPress={props.onPress}
			style={[props.accessability ? styles.default : styles.disabled, props.style]}
			underlayColor={props.customUnderlayColor ? props.customUnderlayColor : '#FFC60B'}>
			<View style={styles.contentContainer}>
				<FontAwesome5 name={props.icon} style={[styles.icon, props.accessability ? {} : styles.iconDisabled]} />
				<Text style={[styles.text, props.accessability ? {} : styles.textDisabled]}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	); 
}

export default ButtonWithIcon;