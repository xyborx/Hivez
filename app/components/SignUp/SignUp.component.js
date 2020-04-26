import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../Button/Button.component';
import DropdownLanguage from '../DropdownLanguage/DropdownLanguage.component';
import EmailField from '../TextField/EmailField.component';
import PasswordField from '../TextField/PasswordField.component';
import TextField from '../TextField/TextField.component';
import styles from './SignUp.component.style';

const SignUp = (props) => {
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
								editable={!props.secondPhase}
								onChangeText={props.setEmail}
								onPressPasswordToggle={props.togglePhase}
								placeholder={props.contentText['EMAIL_PLACEHOLDER']}
								validateInput={true}
								value={props.email} />
							<TextField
								accessbility={props.secondPhase}
								contentText={props.fullNameContext}
								customValidateInput={props.validateFullName}
								onChangeText={props.setFullName}
								placeholder={props.contentText['FULL_NAME_PLACEHOLDER']}
								style={styles.textField}
								validateInput={true}
								value={props.fullName} />
							<PasswordField
								accessbility={props.secondPhase}
								contentText={props.passwordContext}
								onChangeText={props.setPassword}
								placeholder={props.contentText['PASSWORD_PLACEHOLDER']}
								style={styles.textField}
								validateInput={true}
								value={props.password} />
							<PasswordField
								accessbility={props.secondPhase}
								contentText={props.passwordContext}
								customValidateInput={props.checkConfirmPassword}
								onChangeText={props.setConfirmPassword}
								placeholder={props.contentText['CONFIRM_PASSWORD_PLACEHOLDER']}
								validateInput={true}
								value={props.confirmPassword} />
							<Button
								accessability={props.nextButtonAccessbility} 
								onPress={props.onPressNextButton}
								style={styles.button}
								text={props.secondPhase? props.contentText['SIGN_UP'] : props.contentText['NEXT']} />
							<View style={styles.linkContainer}>
								<Text style={[styles.link, styles.alignLeft]}>
									{props.contentText['FORGOT_PASSWORD']}
								</Text>
								<Text style={[styles.link, styles.alignRight]} onPress={props.signIn}>
									{props.contentText['SIGN_IN']}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.policyContainer}>
						<Text style={styles.link}>
							{props.contentText['PRIVACY_POLICY']}
						</Text>
						<Text style={styles.link}>
							{props.contentText['TERM_OF_USE']}
						</Text>
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

export default SignUp;