import React, {useContext, useState} from 'react';
import {Modal, ScrollView, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import styles from './Modal.component.style';

const BasicModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();
	return (
		<View>
			{props.touchableType === 'highlight' ? (
				<TouchableHighlight
					activeOpacity={1}
					onPress={props.toggleModal}
					style={props.style}
					underlayColor={'rgba(0,0,0,0.05)'}>
					{props.element}
				</TouchableHighlight>
			) : (
				<TouchableOpacity
					style={props.style}
					onPress={props.toggleModal}>
					{props.element}
				</TouchableOpacity>
			)}
			<Modal
				animationType={'slide'}
				onRequestClose={props.toggleModal}
				style={styles.modalContainer}
				transparent={true}
				visible={props.visibility}>
				<SafeAreaView style={styles.rootContainer}>
					<ScrollView keyboardShouldPersistTaps={'handled'} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
						<View style={styles.centerContainer}>
							<View style={styles.boxContainer}>
								<ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.elementStyle}>
									{props.children}
								</ScrollView>
								<Button
									accessability={true} 
									onPress={props.toggleModal}
									style={props.fixedCloseButton ? styles.buttonFixed : styles.hidden}
									text={translations["Modal"]["CLOSE_BUTTON"]} />
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal>
		</View>
	);
}

export default BasicModal;