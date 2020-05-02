import React from 'react';
import {Text, View} from 'react-native';
import ModalSelector from '../../customized_library/react-native-modal-selector'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './DropdownChangePicture.component.style';

const DropdownItem = (props) => {
	return (
		<View style={styles.modalOptionContainer}>
			<FontAwesome5 name={props.icon} style={styles.modalOptionIcon} />
			<Text style={styles.modalOptionText}>{props.value}</Text>
		</View>
	);
}

const DropdownChangePicture = (props) => {
	const data = [
		{
			key: -1,
			section: true,
			label: props.contentText['SELECT_PROFILE_PICTURE']},
		{
			key: 0,
			label: 'TAKE_PHOTO',
			component: (
				<DropdownItem
					icon={'camera'}
					value={props.contentText['TAKE_PHOTO']} />
			)
		},
		{
			key: 1,
			label: 'CHOOSE_FROM_LIBRARY',
			component: (
				<DropdownItem
					icon={'folder-open'}
					value={props.contentText['CHOOSE_FROM_LIBRARY']} />
			)
		},
		{
			key: 2,
			label: 'DELETE_PROFILE_PICTURE',
			component: (
				<DropdownItem
					icon={'trash'}
					value={props.contentText['DELETE_PROFILE_PICTURE']} />
			)
		}
	];
	return (
		<ModalSelector
			cancelContainerStyle={styles.modalCancelContainer}
			cancelStyle={styles.modalCancelButton}
			cancelText={props.contentText['CANCEL']}
			cancelTextStyle={styles.modalCancelText}
			data={data}
			onChange={(option) => {props.onChange(option.label)}}
			optionContainerStyle={styles.modal}
			overlayStyle={styles.modalOverlay}
			sectionTextStyle={styles.sectionTextStyle}
			style={props.style}
			touchableActiveOpacity={1}>
			{props.children}
		</ModalSelector>
	);
}

export default DropdownChangePicture;