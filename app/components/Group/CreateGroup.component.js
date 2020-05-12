import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import ButtonWithIcon from '../Button/ButtonWithIcon.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import TextField from '../TextField/TextField.component';
import styles from './CreateGroup.component.style';

const CreateGroup = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<PreviewPicture
						closeText={props.contentText['CLOSE']}
						touchableType={'none'}
						image={props.image}
						style={styles.groupImageContainer} >
						<Image
							source={props.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.image}`}}
							style={styles.groupImage} />
					</PreviewPicture>
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
						<View style={props.image === '' ? styles.noPreview : styles.pictureConfigContainer}>
							<PreviewPicture
								closeText={props.contentText['CLOSE']}
								touchableType={'highlight'}
								image={props.image}
								style={props.image === '' ? styles.hidden : styles.viewImageContainer}>
								<View style={styles.viewImage}>
									<FontAwesome5 name={'eye'} style={styles.icon} />
									<Text style={styles.viewImageText}>{props.contentText['VIEW_GROUP_PICTURE']}</Text>
								</View>
							</PreviewPicture>
							<DropdownChangePicture
								contentText={props.dropdownChangePictureContext}
								onChange={props.onChangeImageDropdown}
								style={props.image === '' ? styles.noMargin : styles.changePictureButton}>
								<ButtonWithIcon
									accessability={true}
									icon={'camera'}
									onPress={() => {}}
									text={props.image === '' ? props.contentText['ADD_GROUP_PICTURE'] : props.contentText['EDIT_GROUP_PICTURE']} />
							</DropdownChangePicture>
						</View>
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