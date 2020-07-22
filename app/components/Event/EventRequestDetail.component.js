import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {rupiahFormatting} from '../../utils/helper.utils';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import styles from './EventRequestDetail.component.style';

const ViewWithIcon = (props) => {
	return (
		<View style={[styles.requestDetail, props.style]}>
			<Text style={styles.requestDetailText}>{props.title}</Text>
			<FontAwesome5 name={props.icon} style={styles.requestDetailIcon} />
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.requestDetail, props.style]}>
			<Text style={styles.requestDetailText}>{props.title}</Text>
			<Text style={styles.requestDetailValue}>{props.value}</Text>
		</View>
	);
};

const EventRequestDetail = (props) => {
	const {id, value, description, status, requester, requestDate, requestTime, approver, approvalDate, approvalTime, requestImage, payee} = props.requestDetail;
	const {image: eventImage, name: eventName} = props.eventDetail;
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={eventImage === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${eventImage}`}}
						style={styles.eventImage}/>
					<Text style={styles.eventName}>{eventName}</Text>
					<View style={styles.requestDetailContainer}>
						<View style={styles.requestValueContainer}>
							<Text style={styles.requestDetailText}>{'IDR'}</Text>
							<Text style={[styles.requestValueText, styles.expense]}>{value}</Text>
						</View>
						<ViewWithValue title={props.contentText['DESCRIPTION']} value={description} />
						<ViewWithValue title={props.contentText['STATUS']} value={props.contentText[status.replace(' ', '_')]} />
						<ViewWithValue title={props.contentText['REQUESTER']} value={requester} />
						<ViewWithValue title={props.contentText['REQUEST_DATE']} value={requestDate} />
						<ViewWithValue title={props.contentText['REQUEST_TIME']} value={requestTime} />
						<View style={status === 'ON_PROGRESS' ? styles.hidden : {}}>
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVER'] : props.contentText['REJECTER']} value={approver} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_DATE'] : props.contentText['REJECTED_DATE']} value={approvalDate} />
							<ViewWithValue title={status === 'APPROVED' ? props.contentText['APPROVED_TIME'] : props.contentText['REJECTED_TIME']} value={approvalTime} />
						</View>
						<TouchableHighlight activeOpacity={1} underlayColor={'rgba(0,0,0,0.05)'} onPress={props.viewPayee}>
							<ViewWithIcon icon={'eye'} title={props.contentText['VIEW_REQUEST_PAYEE']} />
						</TouchableHighlight>
						<PreviewPicture
							closeText={props.contentText['CLOSE']}
							touchableType={'highlight'}
							image={requestImage}
							style={requestImage === '' ? styles.hidden : styles.viewImageContainer}>
							<ViewWithIcon icon={'camera'} title={props.contentText['VIEW_REQUEST_PICTURE']} />
						</PreviewPicture>
						<View style={status === 'ON_PROGRESS' ? styles.approvalContainer : styles.hidden}>
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmRejectText}
								onPress={props.rejectRequest}
								style={styles.rejectButton}
								text={props.contentText['REJECT']} />
							<ButtonWithConfirmation
								accessability={true}
								confirmText={props.confirmApproveText}
								onPress={props.approveRequest}
								style={styles.approveButton}
								text={props.contentText['APPROVE']} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EventRequestDetail;