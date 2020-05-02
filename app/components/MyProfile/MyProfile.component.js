import React, { useState } from 'react';
import {Image, Text, TouchableHighlight, ScrollView, Switch, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme.style';
import ChangePasswordModal from '../Modal/ChangePasswordModal.component';
import ChangeProfileModal from '../Modal/ChangeProfileModal.component';
import ConfirmModal from '../Modal/ConfirmModal.component';
import ConfirmWithPasswordModal from '../Modal/ConfirmWithPasswordModal.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import DropdownLanguage from '../Dropdown/DropdownLanguage.component';
import PrivacyPolicyModal from '../Modal/PrivacyPolicy.component';
import TermsAndConditionsModal from '../Modal/TermsAndConditions.component';
import styles from './MyProfile.component.style';

const ButtonWithIcon = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={1}
			onPress={props.action}
			style={styles.profileSectionItem}
			underlayColor={'rgba(0,0,0,0.05)'}>
			<View style={styles.profileSectionItemContainer}>
				<Text style={styles.profileSectionItemText}>{props.actionName}</Text>
				<FontAwesome5 name={props.actionIcon} style={styles.profileSectionItemIcon} />
			</View>
		</TouchableHighlight>
	);
};

const ButtonWithSwitch = (props) => {
	return (
		<View style={[styles.profileSectionItem, styles.profileSectionItemContainer]}>
			<Text style={styles.profileSectionItemText}>{props.title}</Text>
			<Switch
				trackColor={{ false: theme.COLOR_GREY, true: theme.COLOR_PRIMARY }}
				thumbColor={theme.COLOR_WHITE}
				onValueChange={props.switchOnChange}
				value={props.switchValue} />
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.profileSectionItem, styles.profileSectionItemContainer]}>
			<Text style={styles.profileSectionItemText}>{props.title}</Text>
			<Text style={styles.profileSectionItemValue}>{props.value}</Text>
		</View>
	);
}

const SignIn = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View style={styles.scrollViewWrapper}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<View style={styles.profileSection}>
						<Text style={styles.sectionHeader}>{props.contentText['PROFILE_PICTURE']}</Text>
						<Image
							source={props.profileData.image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${props.profileData.image}`}}
							style={styles.profileImage} />
						<DropdownChangePicture
							contentText={props.dropdownChangePictureContext}
							onChange={props.onChangeProfilePictureDropdown}>
							<ButtonWithIcon
								actionIcon={'camera'}
								actionName={props.contentText['EDIT_PROFILE_PICTURE']} />
						</DropdownChangePicture>
					</View>
					<View style={styles.profileSection}>
						<Text style={styles.sectionHeader}>{props.contentText['PERSONAL_DATA']}</Text>
						<ViewWithValue
							title={props.contentText['DISPLAY_NAME']}
							value={props.profileData.fullName} />
						<ViewWithValue
							title={props.contentText['EMAIL_ADDRESS']}
							value={props.profileData.email} />
						<ViewWithValue
							title={props.contentText['USERNAME']}
							value={props.profileData.username} />
						<ButtonWithSwitch
							switchOnChange={props.toggleAllowOthersAddByID}
							switchValue={props.profileData.allowOthersAddByID}
							title={props.contentText['ALLOW_OTHERS_ADD_BY_USERNAME']} />
						<ChangeProfileModal saveData={props.changeProfileData} data={props.profileData} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['EDIT_PROFILE']}</Text>
								<FontAwesome5 name={'pen'} style={styles.profileSectionItemIcon} />
							</View>
						</ChangeProfileModal>
					</View>
					<View style={styles.profileSection}>
						<Text style={styles.sectionHeader}>{props.contentText['APPLICATION_SETTINGS']}</Text>
						<ButtonWithSwitch
							switchOnChange={props.toggleDarkMode}
							switchValue={props.appSettings.darkMode}
							title={props.contentText['DARK_MODE']} />
						<DropdownLanguage
							contentText={props.dropdownLanguageContext}
							currentValue={props.currentLanguage}
							dataList={props.languageList}
							dataListContext={props.languageContext}
							languageIcons={props.languageIcons}
							onChange={props.setLanguage}>
							<ButtonWithIcon
								actionIcon={'angle-right'}
								actionName={props.contentText['CHANGE_LANGUAGE']} />
						</DropdownLanguage>
						<PrivacyPolicyModal touchableType={'highlight'} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['PRIVACY_POLICY']}</Text>
								<FontAwesome5 name={'angle-right'} style={styles.profileSectionItemIcon} />
							</View>
						</PrivacyPolicyModal>
						<TermsAndConditionsModal touchableType={'highlight'} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['TERM_OF_USE']}</Text>
								<FontAwesome5 name={'angle-right'} style={styles.profileSectionItemIcon} />
							</View>
						</TermsAndConditionsModal>
					</View>
					<View style={styles.profileSection}>
						<Text style={styles.sectionHeader}>{props.contentText['ACCOUNT_SETTINGS']}</Text>
						<ChangePasswordModal saveData={props.changePassword} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['CHANGE_PASSWORD']}</Text>
								<FontAwesome5 name={'lock'} style={styles.profileSectionItemIcon} />
							</View>
						</ChangePasswordModal>
						<ConfirmModal contentText={props.confirmSignOutText} action={props.signOut} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['SIGN_OUT']}</Text>
								<FontAwesome5 name={'sign-out-alt'} style={styles.profileSectionItemIcon} />
							</View>
						</ConfirmModal>
						<ConfirmWithPasswordModal contentText={props.confirmDeleteAccountText} action={props.deleteAccount} style={styles.profileSectionItem}>
							<View style={styles.profileSectionItemContainer}>
								<Text style={styles.profileSectionItemText}>{props.contentText['DELETE_ACCOUNT']}</Text>
								<FontAwesome5 name={'trash'} style={styles.profileSectionItemIcon} />
							</View>
						</ConfirmWithPasswordModal>
					</View>
					<Text style={styles.versionText}>Hivez 1.0.0</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignIn;