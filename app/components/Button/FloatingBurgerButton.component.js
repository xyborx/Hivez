import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FloatingBurgerButton.component.style';

const FloatingBurgerButton = (props) => {
	return (
		<View>
			<TouchableOpacity
				activeOpacity={0.25}
				onPress={props.action}
				style={styles.floatingButtonContainer}>
				<View>
					<FontAwesome5
						name={'bars'}
						style={styles.floatingButtonIcon} />
				</View>
			</TouchableOpacity>
		</View>
	); 
}

export default FloatingBurgerButton;