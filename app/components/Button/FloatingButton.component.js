import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FloatingButton.component.style';

const Button = (props) => {
	const [onFocus, setOnFocus] = useState(false);
	return (
		<View>
			<TouchableOpacity
				style={[styles.floatingButtonContainer, onFocus ? styles.floatingButtonFocused : {}]}
				onPress={() => {
					setOnFocus(!onFocus);
				}}>
				<View >
					<FontAwesome5 name={props.buttonIcon} style={[styles.floatingButtonIcon, onFocus ? styles.floatingButtonFocusedIcon : {}]} />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={onFocus ? [styles.floatingButtonContainer, styles.floatingButtonTopChild] : styles.hidden}
				onPress={() => {
					setOnFocus(false);
					props.topButtonAction();
				}}>
				<View>
					<FontAwesome5 name={props.topButtonIcon} style={styles.floatingButtonIcon} />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={onFocus ? [styles.floatingButtonContainer, styles.floatingButtonLeftChild] : styles.hidden}
				onPress={() => {
					setOnFocus(false);
					props.leftButtonAction();
				}}>
				<View >
					<FontAwesome5 name={props.leftButtonIcon} style={styles.floatingButtonIcon} />
				</View>
			</TouchableOpacity>
		</View>
	); 
}

export default Button;