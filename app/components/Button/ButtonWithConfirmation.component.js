import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import ConfirmModal from '../Modal/ConfirmModal.component';
import styles from './ButtonWithConfirmation.component.style';

const ButtonWithConfirmation = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={0.25}
			disabled={!props.accessability}
			style={[props.accessability ? styles.default : styles.disabled, props.style]}
			underlayColor={props.customUnderlayColor ? props.customUnderlayColor : '#FFC60B'}>
			<View pointerEvents={props.accessability ? 'auto' : 'none'} style={styles.contentContainer}>
				<ConfirmModal contentText={props.confirmText} action={props.onPress} style={styles.modalContainer}>
					<Text style={[styles.text, props.accessability ? {} : styles.textDisabled]}>{props.text}</Text>
				</ConfirmModal>
			</View>
		</TouchableHighlight>
	); 
}

export default ButtonWithConfirmation;