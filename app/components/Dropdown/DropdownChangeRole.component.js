import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ModalSelector from '../../customized_library/react-native-modal-selector';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../Button/Button.component';
import Modal from '../Modal/Modal.component';
import styles from './DropdownChangeRole.component.style';

const DropdownItem = (props) => {
	return (
		<View style={styles.modalOptionContainer}>
			<Text style={styles.modalOptionText}>{props.value}</Text>
			<FontAwesome5 name={'check'} style={props.checked ? styles.modalOptionIcon : styles.modalOptionIconHidden} />
		</View>
	);
};

const DropdownChangeRole = (props) => {
	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {
		setVisibility(!visibility);
	};

	const [newValue, setNewValue] = useState(props.currentValue);
	const onChangeValue = (value) => {
		if (value.label === props.currentValue) return;
		toggleModal();
		setNewValue(value.label);
	};

	const roleList = ['LEADER', 'TREASURER', 'MEMBER'];
	const data = [
		{
			key: -1,
			section: true,
			label: props.contentText['SELECT_ROLE']
		},
		...roleList.map((item, index) => {
			return {
				key: index,
				label: item,
				component: (<DropdownItem value={props.contentText[item]} checked={props.currentValue === item} />)
			};
		})
	];
	return (
		<ModalSelector
			cancelContainerStyle={styles.modalCancelContainer}
			cancelStyle={styles.modalCancelButton}
			cancelText={props.contentText['CANCEL']}
			cancelTextStyle={styles.modalCancelText}
			data={data}
			onChange={onChangeValue}
			optionContainerStyle={styles.modal}
			overlayStyle={styles.modalOverlay}
			sectionTextStyle={styles.sectionTextStyle}
			style={props.style}
			touchableActiveOpacity={1}
			touchableType={'opacity'}>
			<Modal
				element={props.children}
				style={props.style}
				toggleModal={toggleModal}
				touchableType={props.opacityButton ? 'opacity' : 'highlight'}
				visibility={visibility}>
				<Text style={styles.header}>{props.confirmChangeRoleText['MODAL_TITLE']}</Text>
				<Text style={styles.content}>{props.confirmChangeRoleText['MODAL_DETAILS']}</Text>
				<View style={styles.buttonContainer}>
					<Button
						accessability={true}
						customUnderlayColor={'#FF5F5F'}
						onPress={toggleModal}
						style={[styles.button, styles.cancelButton]}
						text={props.confirmChangeRoleText['NO']} />
					<Button
						accessability={true}
						onPress={() => {
							toggleModal();
							props.onChange(newValue);
						}}
						style={styles.button}
						text={props.confirmChangeRoleText['YES']} />
				</View>
			</Modal>
		</ModalSelector>
	);
};

export default DropdownChangeRole;