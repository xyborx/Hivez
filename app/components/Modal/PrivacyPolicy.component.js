import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {LocalizationContext} from '../../contexts/language.context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from './Modal.component';
import styles from './PrivacyPolicy.component.style';

const PrivacyPolicyModal = (props) => {
	const {translations} = useContext(LocalizationContext);
	

	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {setVisibility(!visibility)};
	return (
		<Modal
			element={props.children}
			fixedCloseButton={true}
			touchableType={props.touchableType}
			style={props.style}
			visibility={visibility}
			toggleModal={toggleModal}>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['PRIVACY_POLICY']}</Text>
				{translations['PrivacyPolicy']['PRIVACY_POLICY_TEXT'].map((value, key) => {
					return <Text key={key} style={[styles.text, key == translations['PrivacyPolicy']['PRIVACY_POLICY_TEXT'].length - 1 ? {} : styles.listText]}>{value}</Text>
				})}
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['INFORMATION_COLLECTION_AND_USE']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['INFORMATION_COLLECTION_AND_USE_TEXT']}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['LOG_DATA']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['LOG_DATA_TEXT']}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['COOKIES']}</Text>
				{translations['PrivacyPolicy']['COOKIES_TEXT'].map((value, key) => {
					return <Text key={key} style={[styles.text, key == translations['PrivacyPolicy']['COOKIES_TEXT'].length - 1 ? {} : styles.listText]}>{value}</Text>
				})}
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['SERVICE_PROVIDERS']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['SERVICE_PROVIDERS_TEXT'][0]}</Text>
				<View style={styles.customSection}>
					{translations['PrivacyPolicy']['SERVICE_PROVIDERS_ITEMS'].map((value, key) => {
						return (
							<View key={key} style={styles.textWithIcon}>
								<FontAwesome5 name={'circle'} style={styles.icon} solid />
								<Text style={styles.text}>{value}</Text>
							</View>
						)
					})}
				</View>
				<Text style={styles.text}>{translations['PrivacyPolicy']['SERVICE_PROVIDERS_TEXT'][1]}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['SECURITY']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['SECURITY_TEXT']}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['LINKS_TO_OTHER_SITES']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['LINKS_TO_OTHER_SITES_TEXT']}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['CHILDRENS_PRIVACY']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['CHILDRENS_PRIVACY_TEXT']}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['CHANGES_TO_THIS_PRIVACY_POLICY']}</Text>
				{translations['PrivacyPolicy']['CHANGES_TO_THIS_PRIVACY_POLICY_TEXT'].map((value, key) => {
					return <Text key={key} style={[styles.text, key == translations['PrivacyPolicy']['CHANGES_TO_THIS_PRIVACY_POLICY_TEXT'].length - 1 ? {} : styles.listText]}>{value}</Text>
				})}
			</View>
			<View style={{}}>
				<Text style={styles.header}>{translations['PrivacyPolicy']['CONTACT_US']}</Text>
				<Text style={styles.text}>{translations['PrivacyPolicy']['CONTACT_US_TEXT']}</Text>
			</View>
		</Modal>
	);
}

export default PrivacyPolicyModal;