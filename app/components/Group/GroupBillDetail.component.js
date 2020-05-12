import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import styles from './GroupBillDetail.component.style';

const ViewWithIcon = (props) => {
	return (
		<View style={[styles.billDetail, props.style]}>
			<Text style={styles.billDetailText}>{props.title}</Text>
			<FontAwesome5 name={props.icon} style={styles.billDetailIcon} />
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.billDetail, props.style]}>
			<Text style={styles.billDetailText}>{props.title}</Text>
			<Text style={styles.billDetailValue}>{props.value}</Text>
		</View>
	);
};

const GroupBillDetail = (props) => {
	const {id, groupImage, groupName, value, description, status, payer, paymentDate, paymentTime, approver, approvalDate, approvalTime, billImage} = props.billDetail;
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
						<ViewWithValue title={props.contentText['STATUS']} value={props.contentText[status.replace(' ', '_')]} />
						<ViewWithValue title={props.contentText['PAYER']} value={payer} />
						<ViewWithValue title={props.contentText['PAYMENT_DATE']} value={paymentDate} />
						<ViewWithValue title={props.contentText['PAYMENT_TIME']} value={paymentTime} />
						<View style={status === 'ON PROGRESS' ? styles.hidden : {}}>
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVER'] : props.contentText['REJECTER']} value={approver} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_DATE'] : props.contentText['REJECTED_DATE']} value={approvalDate} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_TIME'] : props.contentText['REJECTED_TIME']} value={approvalTime} />
						</View>
						<PreviewPicture
							closeText={props.contentText['CLOSE']}
							touchableType={'highlight'}
							image={billImage}
							style={billImage === '' ? styles.hidden : styles.viewImageContainer}>
							<ViewWithIcon icon={'camera'} title={props.contentText['VIEW_REQUEST_PICTURE']} />
						</PreviewPicture>
						<View style={status === 'ON PROGRESS' ? styles.approvalContainer : styles.hidden}>
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmRejectText}
								onPress={props.rejectBillPayment}
								style={styles.rejectButton}
								text={props.contentText['REJECT']} />
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmApproveText}
								onPress={props.approveBillPayment}
								style={styles.approveButton}
								text={props.contentText['APPROVE']} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupBillDetail;