import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../Button/Button.component';
import EmailField from '../EmailField/EmailField.component';
import PasswordField from '../PasswordField/PasswordField.component';
import DropdownLanguage from '../DropdownLanguage/DropdownLanguage.component';
import styles from './SignIn.component.style';

const SignIn = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View style={{alignSelf: 'stretch', padding: 24}}>
					<View style={styles.headerContainer}>
						<Text style={styles.header}>
							{props.contentText['SignIn']['APP_NAME']}
						</Text>
					</View>
					<View style={styles.centerContainer}>
						<View style={styles.boxContainer}>
							<Text style={styles.title}>
								{props.contentText['SignIn']['PAGE_HEADER']}
							</Text>
							<EmailField
								value={props.email}
								editable={props.emailEditability}
								onChangeText={props.setEmail}
								style={styles.textField}
								validity={props.emailValidity}
								errorMessage={props.contentText['EmailValidation']['INVALID_EMAIL_FORMAT']}
								onPressPasswordToggle={props.togglePasswordAccessbility}
								placeholder={props.contentText['SignIn']['EMAIL_PLACEHOLDER']} />
							<PasswordField
								value={props.password}
								onChangeText={props.setPassword}
								accessbility={props.passwordAccessbility}
								visibility={props.passwordVisibility}
								validity={props.passwordValidity}
								onPressPasswordToggle={props.togglePasswordVisibility}
								errorMessage={props.contentText['EmailValidation']['INVALID_EMAIL_FORMAT']}
								style={styles.textField}
								placeholder={props.contentText['SignIn']['PASSWORD_PLACEHOLDER']} />
							<Button
								style={styles.button}
								accessability={props.nextButtonAccessbility} 
								text={props.contentText['SignIn']['NEXT']}
								onPress={props.onPressNextButton}/>
							<View style={styles.linkContainer}>
								<Text style={styles.link}>
									{props.contentText['SignIn']['FORGOT_PASSWORD']}
								</Text>
								<Text style={styles.link}>
									{props.contentText['SignIn']['SIGN_UP']}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.policyContainer}>
						<Text style={styles.link}>
							{props.contentText['SignIn']['PRIVACY_POLICY']}
						</Text>
						<Text style={styles.link}>
							{props.contentText['SignIn']['TERM_OF_USE']}
						</Text>
					</View>
					<DropdownLanguage
						title={props.contentText['DropdownLanguage']['SELECT_LANGUAGE']}
						currentValue={props.currentLanguage}
						dataList={props.availableLanguage}
						dataListContext={props.availableLanguageContext}
						langaugeIcons={props.langaugeIcons}
						cancelText={props.contentText['DropdownLanguage']['CANCEL_SELECT']}
						onChange={props.setLanguage} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignIn;