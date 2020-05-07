import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import ButtonWithIcon from '../Button/ButtonWithIcon.component';
import DatePicker from '../Date/DatePicker.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import NumberField from '../TextField/NumberField.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import SwitchButton from '../Button/SwitchButton.component';
import TextField from '../TextField/TextField.component';
import TimePicker from '../Date/TimePicker.component';
import styles from './CreateGroupTransaction.component.style';

const CreateGroupTransaction = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.groupDetail.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.groupDetail.image}`}}
						style={styles.groupImage}/>
					<Text style={styles.groupName}>{props.groupDetail.name}</Text>
					<View style={styles.createTransactionContainer}>
						<SwitchButton
							style={styles.switch}
							leftValue={'INCOME'}
							rightValue={'EXPENSE'}
							onChange={props.setType}
							text={props.contentText}
							value={props.type} />
						<NumberField
							onChangeText={props.setValue}
							textStyle={props.type === 'INCOME' ? styles.income : styles.expense}
							style={styles.numberField}
							value={props.value} />
						<DatePicker
							onChange={props.setDate}
							style={styles.textField}
							value={props.date} />
						<TimePicker
							onChange={props.setTime}
							style={styles.textField}
							value={props.time} />
						<TextField
							contentText={props.descriptionText}
							customValidateInput={props.validateDescription}
							onChangeText={props.setDescription}
							placeholder={props.contentText['DESCRIPTION_PLACEHOLDER']}
							style={styles.textField}
							textIcon={'sticky-note'}
							validateInput={true}
							value={props.description} />
						<View style={props.image === '' ? styles.noPreview : styles.pictureConfigContainer}>
							<PreviewPicture
								closeText={props.contentText['CLOSE']}
								touchableType={'highlight'}
								image={props.image}
								style={props.image === '' ? styles.hidden : styles.viewImageContainer}>
								<View style={styles.viewImage}>
									<FontAwesome5 name={'eye'} style={styles.icon} />
									<Text style={styles.viewImageText}>{props.contentText['VIEW_TRANSACTION_PICTURE']}</Text>
								</View>
							</PreviewPicture>
							<DropdownChangePicture
								contentText={props.dropdownChangePictureContext}
								onChange={props.onChangeImageDropdown}
								style={props.image === '' ? styles.noMargin : styles.changePictureButton}>
								<ButtonWithIcon
									accessability={true}
									icon={props.image === '' ? 'camera' : 'pen'}
									style={styles.button}
									onPress={() => {}}
									text={props.image === '' ? props.contentText['ADD_TRANSACTION_PICTURE'] : props.contentText['EDIT_TRANSACTION_PICTURE']} />
							</DropdownChangePicture>
						</View>
						<ButtonWithConfirmation
							accessability={props.nextButtonAccessbility}
							confirmText={props.confirmCreateText}
							onPress={props.createGroupTransaction}
							style={styles.button}
							text={props.contentText['CREATE_REQUEST']} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default CreateGroupTransaction;