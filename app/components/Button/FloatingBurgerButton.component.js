import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FloatingBurgerButton.component.style';

const FloatingBurgerButton = (props) => {
	return (
		<View>
			<TouchableHighlight
				activeOpacity={0.25}
				style={styles.floatingButtonContainer}
				underlayColor={'#FFC60B'}
				onPress={() => {
					// setOnFocus(!onFocus);
				}}>
				<View>
					<FontAwesome5
						name={'bars'}
						style={styles.floatingButtonIcon} />
				</View>
			</TouchableHighlight>
		</View>
	); 
}

export default FloatingBurgerButton;