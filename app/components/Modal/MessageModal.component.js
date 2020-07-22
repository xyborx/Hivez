import React, {useContext} from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {PopUpContext} from '../../contexts/popup.context';
import Button from '../Button/Button.component';
import styles from './MessageModal.component.style';

const BasicModal = () => {
	const {popUpState, message, hidePopUp} = useContext(PopUpContext);

	return (
		<Modal
			animationType={'slide'}
			onRequestClose={hidePopUp}
			style={styles.modalContainer}
			transparent={true}
			visible={popUpState}>
			<SafeAreaView style={styles.rootContainer}>
				<ScrollView keyboardShouldPersistTaps={'handled'} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
					<View style={styles.centerContainer}>
						<View style={styles.boxContainer}>
							<ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.elementStyle}>
								<Text style={styles.text}>{message}</Text>
							</ScrollView>
							<Button
								accessability={true} 
								onPress={hidePopUp}
								style={styles.buttonFixed}
								text={'OK'} />
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
}

export default BasicModal;