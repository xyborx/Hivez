import React, {useContext, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {LocalizationContext} from '../../utils/language.utils';
import Button from '../Button/Button.component';
import Modal from 'react-native-modal';
import theme from '../../styles/theme.style';
import styles from './Modal.component.style';

const BasicModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();
	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {setVisibility(!visibility)};
	return (
		<View style={props.style}>
			<TouchableOpacity style={props.toggleContainerStyle} onPress={toggleModal}>
                {props.element}
			</TouchableOpacity>
			<Modal
				backdropOpacity={theme.OVERLAY_OPACITY}
				isVisible={visibility}
				onBackButtonPress={toggleModal}
				onBackdropPress={toggleModal}
				style={styles.modalContainer} >
				<View style={styles.modalWrapper}>
					<ScrollView style={styles.modalScrollViewContainer} contentContainerStyle={styles.modalContentContainer} >
						{props.children}
					</ScrollView>
					<Button
						accessability={true} 
						onPress={toggleModal}
						style={styles.button}
						text={translations["Modal"]["CLOSE_BUTTON"]} />
				</View>
			</Modal>
		</View>
	);
}

export default BasicModal;