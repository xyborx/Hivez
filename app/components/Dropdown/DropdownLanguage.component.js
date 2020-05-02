import React from 'react';
import {Text, View} from 'react-native';
import ModalSelector from '../../customized_library/react-native-modal-selector'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Flag} from 'react-native-svg-flagkit';
import styles from './DropdownLanguage.component.style';

const DropdownLanguage = (props) => {
	const data = [
		{ key: -1, section: true, label: props.contentText['SELECT_LANGUAGE']},
		...props.dataList.map((value, i) => ({
			key: i,
			label: value,
			component: (
				<View style={styles.modalOptionContainer}>
					<Flag id={props.languageIcons[value]} size={0.1} />
					<Text style={styles.modalOptionText}>{props.dataListContext[value]}</Text>
					<FontAwesome5 name={'check'} style={props.currentValue === value ? styles.modalOptionIcon : styles.modalOptionIconHidden} />
				</View>
			)
		}))
	];
	return (
		<ModalSelector
			cancelContainerStyle={styles.modalCancelContainer}
			cancelStyle={styles.modalCancelButton}
			cancelText={props.contentText['CANCEL_SELECT']}
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

export default DropdownLanguage;