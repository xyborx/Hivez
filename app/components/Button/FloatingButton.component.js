import React, {useState} from 'react';
import {TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FloatingButton.component.style';

const Button = (props) => {
	const [onFocus, setOnFocus] = useState(false);
	return (
		<View>
			<TouchableHighlight
				activeOpacity={0.25}
				style={[styles.floatingButtonContainer, onFocus ? styles.floatingButtonFocused : {}]}
				underlayColor={'#FFC60B'}
				onPress={() => {
					setOnFocus(!onFocus);
				}}>
				<View>
					<FontAwesome5
						name={onFocus ? props.buttonIconOnFocus : props.buttonIcon}
						style={[styles.floatingButtonIcon, onFocus ? styles.floatingButtonFocusedIcon : {}]} />
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				activeOpacity={0.25}
				style={onFocus ? [styles.floatingButtonContainer, styles.floatingButtonTopChild] : styles.hidden}
				underlayColor={'#FFC60B'}
				onPress={() => {
					setOnFocus(false);
					props.topButtonAction();
				}}>
				<View>
					<FontAwesome5 name={props.topButtonIcon} style={styles.floatingButtonIcon} />
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				activeOpacity={0.25}
				style={onFocus ? [styles.floatingButtonContainer, styles.floatingButtonLeftChild] : styles.hidden}
				underlayColor={'#FFC60B'}
				onPress={() => {
					setOnFocus(false);
					props.leftButtonAction();
				}}>
				<View >
					<FontAwesome5 name={props.leftButtonIcon} style={styles.floatingButtonIcon} />
				</View>
			</TouchableHighlight>
		</View>
	); 
}

export default Button;