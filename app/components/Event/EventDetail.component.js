import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RecentTransactionDetail from '../RecentTransaction/RecentTransactionDetail.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import {rupiahFormatting} from '../../utils/helper.utils';
import styles from './EventDetail.component.style';

const ActionButton = (props) => {
	return (
		<TouchableOpacity onPress={props.action} style={styles.actionButtonItem}>
			<View>
				<FontAwesome5 name={props.icon} style={styles.actionIcon} />
				<Text style={styles.actionText}>{props.text.replace(' ', '\n')}</Text>
			</View>
		</TouchableOpacity>
	);
};

const EventDetail = (props) => {
	const {id, image, name, description, totalExpense} = props.eventDetail;
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View>
					<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
					<FloatingBurgerButton action={props.openDrawer} />
					<PreviewPicture
						closeText={props.contentText['CLOSE']}
						touchableType={'none'}
						image={image}
						style={styles.eventImageContainer} >
						<Image
							source={image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
							style={styles.eventImage} />
					</PreviewPicture>
					<Text style={styles.eventName}>{name}</Text>
					<Text style={styles.eventDescription}>{description}</Text>
					<View style={[styles.sectionContainer, styles.totalExpenseContainer]}>
						<Text style={styles.itemText}>{props.contentText['TOTAL_EXPENSES']}</Text>
						<TouchableOpacity onPress={props.toggleShowTotalExpense}>
							<View style={styles.totalExpenseValueContainer}>
								{props.showTotalExpense ? <Text style={styles.totalExpense}>{rupiahFormatting(totalExpense)}</Text> :
								<Text style={styles.hideTotalExpense}>{props.contentText['TAP_TO_SHOW']}</Text>}
								<FontAwesome5 name={props.showTotalExpense ? 'eye-slash' : 'eye'} style={styles.totalExpenseIcon} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionHeader}>{props.contentText['SHORTCUT']}</Text>
						<View style={styles.actionButtonContainer}>
							<ActionButton action={props.navigateToCreateEventRequest} icon={'hand-holding-usd'} text={props.contentText['CREATE_REQUEST']} />
							<ActionButton action={props.navigateToViewReport} icon={'file-invoice-dollar'} text={props.contentText['VIEW_REPORT']} />
							<ActionButton action={props.navigateToInviteMember} icon={'user-plus'} text={props.contentText['INVITE_MEMBER']} />
							<ActionButton action={props.navigateToEventSettings} icon={'cogs'} text={props.contentText['EVENT_SETTINGS']} />
						</View>
					</View>
					{/* <RecentTransactionDetail
						contentText={props.recentRequestText}
						style={styles.transactionList}
						onItemClick={props.onRequestDetailClick}
						transactionList={props.requestList} /> */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EventDetail;