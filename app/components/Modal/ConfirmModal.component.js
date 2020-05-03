import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../Button/Button.component';
import Modal from './Modal.component';
import styles from './ConfirmModal.component.style';

const ConfirmModal = (props) => {
	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {
		setVisibility(!visibility);
	};
	return (
		<Modal
			element={props.children}
			style={props.style}
			touchableType={'highlight'}
			visibility={visibility}
			toggleModal={toggleModal}>
				<Text style={styles.header}>{props.contentText['MODAL_TITLE']}</Text>
				<Text style={styles.content}>{props.contentText['MODAL_DETAILS']}</Text>
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={props.contentText['NO']} />
					<Button
						accessability={true}
						onPress={() => {
							toggleModal();
							props.action();
						}}
						style={styles.button}
						text={props.contentText['YES']} />
				</View>
		</Modal>
	);
};

export default ConfirmModal;