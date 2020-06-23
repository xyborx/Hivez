import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import styles from './GroupBillApproval.component.style';

const ViewWithValue = (props) => {
	return (
		<View style={[styles.billDetail, props.style]}>
			<Text style={styles.billDetailText}>{props.title}</Text>
			<Text style={styles.billDetailValue}>{props.value}</Text>
		</View>
	);
};

const GroupBillApproval = (props) => {
	const {id, value, description, status, creator, creationDate, creationTime, approver, approvalDate, approvalTime} = props.billDetail;
	const {image: groupImage, name:groupName} = props.groupDetail;
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
							<Text style={styles.billValueText}>{value}</Text>
						</View>
						<ViewWithValue title={props.contentText['DESCRIPTION']} value={description} />
						<ViewWithValue title={props.contentText['STATUS']} value={props.contentText[status.replace(' ', '_')]} />
						<ViewWithValue title={props.contentText['CREATOR']} value={creator} />
						<ViewWithValue title={props.contentText['CREATION_DATE']} value={creationDate} />
						<ViewWithValue title={props.contentText['CREATION_TIME']} value={creationTime} />
						<View style={status === 'ON_PROGRESS' ? styles.hidden : {}}>
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVER'] : props.contentText['REJECTER']} value={approver} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_DATE'] : props.contentText['REJECTED_DATE']} value={approvalDate} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_TIME'] : props.contentText['REJECTED_TIME']} value={approvalTime} />
						</View>
						<View style={status === 'ON_PROGRESS' ? styles.approvalContainer : styles.hidden}>
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmRejectText}
								onPress={props.rejectGroupBill}
								style={styles.rejectButton}
								text={props.contentText['REJECT']} />
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmApproveText}
								onPress={props.approveGroupBill}
								style={styles.approveButton}
								text={props.contentText['APPROVE']} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GroupBillApproval;