import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {LocalizationContext} from '../../utils/language.utils';
import Modal from './Modal.component';
import styles from './TermsAndConditions.component.style';

const TermsAndConditionsModal = (props) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();
	return (
		<Modal element={props.children} style={props.style}>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['TermsAndConditions']['TERMS_AND_CONDITIONS']}</Text>
				{translations['TermsAndConditions']['TERMS_AND_CONDITIONS_TEXT'].map((value, key) => {
					return <Text key={key} style={[styles.text, key == translations['TermsAndConditions']['TERMS_AND_CONDITIONS_TEXT'].length - 1 ? {} : styles.listText]}>{value}</Text>
				})}
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['TermsAndConditions']['CHANGES_TO_THIS_TERMS_AND_CONDITIONS']}</Text>
				{translations['TermsAndConditions']['CHANGES_TO_THIS_TERMS_AND_CONDITIONS_TEXT'].map((value, key) => {
					return <Text key={key} style={[styles.text, key == translations['TermsAndConditions']['CHANGES_TO_THIS_TERMS_AND_CONDITIONS_TEXT'].length - 1 ? {} : styles.listText]}>{value}</Text>
				})}
			</View>
			<View style={{}}>
				<Text style={styles.header}>{translations['TermsAndConditions']['CONTACT_US']}</Text>
				<Text style={styles.text}>{translations['TermsAndConditions']['CONTACT_US_TEXT']}</Text>
			</View>
		</Modal>
	);
}

export default TermsAndConditionsModal;