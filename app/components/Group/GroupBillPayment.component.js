import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import ButtonWithIcon from '../Button/ButtonWithIcon.component';
import DatePicker from '../Date/DatePicker.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import TimePicker from '../Date/TimePicker.component';
import styles from './GroupBillPayment.component.style';

const ViewWithValue = (props) => {
	return (
		<View style={[styles.billDetail, props.style]}>
			<Text style={styles.billDetailText}>{props.title}</Text>
			<Text style={styles.billDetailValue}>{props.value}</Text>
		</View>
	);
};

const GroupBillPayment = (props) => {
	const {id, groupImage, groupName, value, description} = props.billDetail;
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={groupImage === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${groupImage}`}}
						style={styles.groupImage}/>
					<Text style={styles.groupName}>{groupName}</Text>
					<View style={styles.billDetailContainer}>
						<View style={styles.billValueContainer}>
							<Text style={styles.billDetailText}>{'IDR'}</Text>
							<Text style={[styles.billValueText, styles.income]}>{value}</Text>
						</View>
						<ViewWithValue title={props.contentText['DESCRIPTION']} value={description} />
						<DatePicker
							onChange={props.setDate}
							style={styles.textField}
							value={props.date} />
						<TimePicker
							onChange={props.setTime}
							style={styles.textField}
							value={props.time} />
						<View style={[props.image === '' ? styles.noPreview : styles.pictureConfigContainer, styles.pictureContainer]}>
							<PreviewPicture
								closeText={props.contentText['CLOSE']}
								touchableType={'highlight'}
								image={props.image}
								style={props.image === '' ? styles.hidden : styles.viewImageContainer}>
								<View style={styles.viewImage}>
									<FontAwesome5 name={'eye'} style={styles.icon} />
									<Text style={styles.viewImageText}>{props.contentText['VIEW_BILL_PICTURE']}</Text>
								</View>
							</PreviewPicture>
							<DropdownChangePicture
								contentText={props.dropdownChangePictureContext}
								onChange={props.onChangeImageDropdown}
								style={props.image === '' ? styles.noMargin : styles.changePictureButton}>
								<ButtonWithIcon
									accessability={true}
									icon={props.image === '' ? 'camera' : 'pen'}
									onPress={() => {}}
									text={props.image === '' ? props.contentText['ADD_BILL_PICTURE'] : props.contentText['EDIT_BILL_PICTURE']} />
							</DropdownChangePicture>
						</View>
						<ButtonWithConfirmation
							accessability={props.nextButtonAccessbility}
							confirmText={props.confirmPayText}
							onPress={props.payBill}
							style={styles.payButton}
							text={props.contentText['PAY_BILL']} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupBillPayment;