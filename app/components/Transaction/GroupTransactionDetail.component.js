import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import styles from './GroupTransactionDetail.component.style';

const ViewWithIcon = (props) => {
	return (
		<View style={[styles.transactionDetail, props.style]}>
			<Text style={styles.transactionDetailText}>{props.title}</Text>
			<FontAwesome5 name={props.icon} style={styles.transactionDetailIcon} />
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.transactionDetail, props.style]}>
			<Text style={styles.transactionDetailText}>{props.title}</Text>
			<Text style={styles.transactionDetailValue}>{props.value}</Text>
		</View>
	);
};

const CreateGroupTransaction = (props) => {
	const {id, groupImage, groupName, value, description, type, status, requester, requestDate, requestTime, approver, approvalDate, approvalTime, transactionImage} = props.transactionDetail;
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
					<View style={styles.transactionDetailContainer}>
						<Text style={[styles.valueText, type === 'DEBIT' ? styles.debit : styles.credit]}>{value}</Text>
						<ViewWithValue title={props.contentText['DESCRIPTION']} value={description} />
						<ViewWithValue title={props.contentText['TYPE']} value={props.contentText[type]} />
						<ViewWithValue title={props.contentText['STATUS']} value={props.contentText[status.replace(' ', '_')]} />
						<ViewWithValue title={props.contentText['REQUESTER']} value={requester} />
						<ViewWithValue title={props.contentText['REQUEST_DATE']} value={requestDate} />
						<ViewWithValue title={props.contentText['REQUEST_TIME']} value={requestTime} />
						<View style={status === 'ON PROGRESS' ? styles.hidden : {}}>
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVER'] : props.contentText['REJECTER']} value={approver} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_DATE'] : props.contentText['REJECTED_DATE']} value={approvalDate} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_TIME'] : props.contentText['REJECTED_TIME']} value={approvalTime} />
						</View>
						<PreviewPicture
							closeText={props.contentText['CLOSE']}
							touchableType={'highlight'}
							image={transactionImage}
							style={transactionImage === '' ? styles.hidden : styles.viewImageContainer}>
							<ViewWithIcon icon={'camera'} title={props.contentText['VIEW_TRANSACTION_PICTURE']} />
						</PreviewPicture>
						<View style={status === 'ON PROGRESS' ? styles.approvalContainer : styles.hidden}>
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmRejectText}
								onPress={props.rejectTransaction}
								style={styles.rejectButton}
								text={props.contentText['REJECT']} />
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmApproveText}
								onPress={props.approveTransaction}
								style={styles.approveButton}
								text={props.contentText['APPROVE']} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default CreateGroupTransaction;