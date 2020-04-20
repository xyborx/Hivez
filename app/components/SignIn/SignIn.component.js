import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {LocalizationContext} from '../../utils/language.utils';

import styles from './SignIn.component.style';
import Button from '../Button/Button.component';
import TextField from '../TextField/TextField.component';
import PasswordField from '../PasswordField/PasswordField.component';

const SignIn = (props) => {
	// const {setEmail, email, setPassword, password} = props;
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const setEmail = function(){};
	const email = '';
	const setPassword = function(){};
	const password = '';

	return (
		<SafeAreaView style={styles.container}>
			<View style={{backgroundColor: '#F8F8F8', flex: 1, paddingHorizontal: 24}}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Text style={styles.header}>{translations['SignIn']['APP_NAME']}</Text>
				</View>
				<View style={{backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 8, shadowColor: "#000"}}>
					<Text style={styles.title}>{translations['SignIn']['PAGE_HEADER']}</Text>
					<TextField value={email} onChangeText={setEmail} style={styles.textField} placeholder={translations['SignIn']['EMAIL_PLACEHOLDER']} />
					<PasswordField value={password} onChangeText={setPassword} style={styles.textField} isHidden={true} placeholder={translations['SignIn']['PASSWORD_PLACEHOLDER']} />
					<Button style={styles.button} text={translations['SignIn']['NEXT']} />
					<View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 32, width: '100%'}}>
						<Text style={styles.link}>{translations['SignIn']['FORGOT_PASSWORD']}</Text>
						<Text style={styles.link}>{translations['SignIn']['SIGN_UP']}</Text>
					</View>
				</View>
				<View style={{flex: 1}}>
					<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginVertical: 24}}>
						<Text style={[styles.link, styles.alignRight]}>{translations['SignIn']['PRIVACY_POLICY']}</Text>
						<Text style={[styles.link, styles.alignLeft]}>{translations['SignIn']['TERM_OF_USE']}</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default SignIn;