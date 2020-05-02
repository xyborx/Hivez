import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Flag} from 'react-native-svg-flagkit';
import Button from '../Button/Button.component';
import DropdownLanguage from '../Dropdown/DropdownLanguage.component';
import EmailField from '../TextField/EmailField.component';
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
								<TouchableOpacity onPress={props.signIn}>
									<Text style={[styles.link, styles.alignLeft]}>
										{props.contentText['SIGN_IN']}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={props.signUp}>
									<Text style={[styles.link, styles.alignRight]}>
										{props.contentText['SIGN_UP']}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.policyContainer}>
						<PrivacyPolicyModal>
							<Text style={styles.link}>
								{props.contentText['PRIVACY_POLICY']}
							</Text>
						</PrivacyPolicyModal>
						<TermsAndConditionsModal>
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
						languageIcons={props.languageIcons}
						onChange={props.setLanguage}
						style={styles.dropdown}>
						<View style={styles.dropdownWrapper}>
							<Flag id={props.languageIcons[props.currentLanguage]} size={0.075} />
							<Text style={styles.dropdownText}>{props.languageContext[props.currentLanguage]}</Text>
							<FontAwesome5 name={'caret-down'} style={styles.dropdownIcon} />
						</View>
					</DropdownLanguage>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default ForgotPassword;