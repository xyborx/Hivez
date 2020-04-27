import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../Button/Button.component';
import DropdownLanguage from '../DropdownLanguage/DropdownLanguage.component';
import EmailField from '../TextField/EmailField.component';
import PasswordField from '../TextField/PasswordField.component';
import PrivacyPolicyModal from '../Modal/PrivacyPolicy.component';
import TermsAndConditionsModal from '../Modal/TermsAndConditions.component';
import styles from './ForgotPassword.component.style';

const ForgotPassword = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View style={styles.scrollViewWrapper}>
					<View style={styles.headerContainer}>
						<Text style={styles.header}>
							{props.contentText['APP_NAME']}
						</Text>
					</View>
					<View style={styles.centerContainer}>
						<View style={styles.boxContainer}>
							<Text style={styles.title}>
								{props.contentText['PAGE_HEADER']}
							</Text>
							<EmailField
								contentText={props.emailContext}
								editable={true}
								onChangeText={props.setEmail}
								onPressPasswordToggle={props.togglePhase}
								placeholder={props.contentText['EMAIL_PLACEHOLDER']}
								style={props.secondPhase ? styles.hidden : {}}
								validateInput={true}
								value={props.email} />
							<Text style={props.secondPhase ? {textAlign: 'center'} : styles.hidden}>
								{props.contentText['RESET_PASSWORD_TEXT'].replace("{email}", props.email)}
							</Text>
							<Button
								accessability={props.nextButtonAccessbility} 
								onPress={props.onPressNextButton}
								style={props.secondPhase ? styles.hidden : styles.button}
								text={props.contentText['RESET_PASSWORD']} />
							<View style={styles.linkContainer}>
								<Text style={[styles.link, styles.alignLeft]} onPress={props.signIn}>
									{props.contentText['SIGN_IN']}
								</Text>
								<Text style={[styles.link, styles.alignRight]} onPress={props.signUp}>
									{props.contentText['SIGN_UP']}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.policyContainer}>
						<PrivacyPolicyModal style={styles.modalLink} toggleContainerStyle={styles.modalLinkContainer}>
							<Text style={styles.link}>
								{props.contentText['PRIVACY_POLICY']}
							</Text>
						</PrivacyPolicyModal>
						<TermsAndConditionsModal style={styles.modalLink} toggleContainerStyle={styles.modalLinkContainer}>
							<Text style={styles.link}>
								{props.contentText['TERM_OF_USE']}
							</Text>
						</TermsAndConditionsModal>
					</View>
					<DropdownLanguage
						contentText={props.dropdownContext}
						currentValue={props.currentLanguage}
						dataList={props.languageList}
						dataListContext={props.languageContext}
						langaugeIcons={props.langaugeIcons}
						onChange={props.setLanguage} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default ForgotPassword;