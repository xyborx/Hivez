import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import ButtonWithIcon from '../Button/ButtonWithIcon.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import TextField from '../TextField/TextField.component';
import styles from './CreateGroup.component.style';

const CreateGroup = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${props.image}`}}
						style={styles.groupImage} />
					<View style={styles.createGroupContainer}>
						<TextField
							contentText={props.groupNameText}
							customValidateInput={props.validateName}
							onChangeText={props.setName}
							placeholder={props.contentText['GROUP_NAME_PLACEHOLDER']}
							style={styles.textField}
							textIcon={'address-card'}
							validateInput={true}
							value={props.name} />
						<TextField
							contentText={props.groupNameText}
							onChangeText={props.setDescription}
							placeholder={props.contentText['GROUP_DESCRIPTION_PLACEHOLDER']}
							style={styles.textField}
							textIcon={'sticky-note'}
							value={props.description} />
						<DropdownChangePicture
							contentText={props.dropdownChangePictureContext}
							onChange={props.onChangeImageDropdown} style={styles.changePictureButton}>
							<ButtonWithIcon
								accessability={true}
								icon={'camera'}
								style={styles.button}
								onPress={() => {}}
								text={props.contentText['EDIT_GROUP_PICTURE']} />
						</DropdownChangePicture>
						<ButtonWithConfirmation
							accessability={props.nextButtonAccessbility}
							confirmText={props.confirmCreateText}
							onPress={props.createGroup}
							style={styles.button}
							text={props.contentText['CREATE_GROUP']} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default CreateGroup;