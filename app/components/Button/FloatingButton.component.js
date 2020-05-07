import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FloatingButton.component.style';

const FloatingButton = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={0.25}
			style={styles.floatingButtonContainer}
			underlayColor={'#FFC60B'}
			onPress={props.action}>
			<View>
				<FontAwesome5
					name={props.buttonIcon}
					style={styles.floatingButtonIcon} />
			</View>
		</TouchableHighlight>
	); 
}

export default FloatingButton;