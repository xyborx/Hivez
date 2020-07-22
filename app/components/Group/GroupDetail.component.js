import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RecentTransactionDetail from '../RecentTransaction/RecentTransactionDetail.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import {rupiahFormatting} from '../../utils/helper.utils';
import styles from './GroupDetail.component.style';

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

const GroupDetail = (props) => {
	const {id, image, name, description, balance} = props.groupDetail;
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
						style={styles.groupImageContainer} >
						<Image
							source={image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
							style={styles.groupImage} />
					</PreviewPicture>
					<Text style={styles.groupName}>{name}</Text>
					<Text style={styles.groupDescription}>{description}</Text>
					<View style={[styles.sectionContainer, styles.balanceContainer]}>
						<Text style={styles.itemText}>{props.contentText['GROUP_BALANCE']}</Text>
						<TouchableOpacity onPress={props.toggleShowBalance}>
							<View style={styles.balanceValueContainer}>
								{props.showBalance ? <Text style={[styles.balance, balance < 0 ? styles.minus : styles.plus]}>{rupiahFormatting(balance)}</Text> :
								<Text style={styles.hideBalance}>{props.contentText['TAP_TO_SHOW']}</Text>}
								<FontAwesome5 name={props.showBalance ? 'eye-slash' : 'eye'} style={styles.balanceIcon} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionHeader}>{props.contentText['SHORTCUT']}</Text>
						<View style={styles.actionButtonContainer}>
							<ActionButton action={props.navigateToCreateGroupRequest} icon={'hand-holding-usd'} text={props.contentText['CREATE_REQUEST']} />
							<ActionButton action={props.navigateToBillPayment} icon={'receipt'} text={props.contentText['PAY_BILL']} />
							<ActionButton action={props.navigateToViewReport} icon={'file-invoice-dollar'} text={props.contentText['VIEW_REPORT']} />
							<ActionButton action={props.navigateToInviteMember} icon={'user-plus'} text={props.contentText['INVITE_MEMBER']} />
							<ActionButton action={props.navigateToGroupSettings} icon={'cogs'} text={props.contentText['GROUP_SETTINGS']} />
						</View>
					</View>
					<RecentTransactionDetail
						contentText={props.recentBillText}
						style={styles.transactionList}
						onItemClick={props.onBillDetailClick}
						transactions={props.requestList} />
					<RecentTransactionDetail
						contentText={props.recentRequestText}
						style={styles.transactionList}
						onItemClick={props.onRequestDetailClick}
						transactions={props.billList} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupDetail;