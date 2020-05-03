import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './FloatingBackButton.component.style';

const FloatingBackButton = (props) => {
	return (
		<View>
			<TouchableOpacity
				activeOpacity={0.25}
				style={styles.floatingButtonContainer}
				onPress={props.action}>
				<Text style={styles.floatingActionText}>{props.backText}</Text>
			</TouchableOpacity>
		</View>
	); 
}

export default FloatingBackButton;