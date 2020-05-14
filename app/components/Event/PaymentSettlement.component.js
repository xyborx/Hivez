import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {rupiahFormatting} from '../../utils/helper.utils';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import styles from './PaymentSettlement.component.style';

const SettlementItem = (props) => {
	const {lenderID, lenderName, lenderImage, lenderUsername, borroweerID, borroweerName, borrowerImage, borrowerUsername, value} = props.data;
	return (
		<View style={styles.sectionContainer}>
			<View style={styles.usersContainer}>
				<View style={styles.userItem}>
					<Text style={styles.userTitle}>{props.contentText['BORROWER']}</Text>
					<Image
						source={borrowerImage === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${borrowerImage}`}}
						style={styles.profileImage}/>
					<Text style={styles.fullName}>{borroweerName}</Text>
					<Text style={styles.username}>{`@${borrowerUsername}`}</Text>
				</View>
				<FontAwesome5 name={'long-arrow-alt-right'} style={styles.settlementIcon} />
				<View style={styles.userItem}>
					<Text style={styles.userTitle}>{props.contentText['LENDER']}</Text>
					<Image
						source={lenderImage === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${lenderImage}`}}
						style={styles.profileImage}/>
					<Text style={styles.fullName}>{lenderName}</Text>
					<Text style={styles.username}>{`@${lenderUsername}`}</Text>
				</View>
			</View>
			<Text style={styles.settlementValue}>{rupiahFormatting(value)}</Text>
		</View>
	);
};

const PaymentSettlement = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.eventDetail.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${props.eventDetail.image}`}}
						style={styles.eventImage}/>
					<Text style={styles.eventName}>{props.eventDetail.name}</Text>
					{props.settlementList.map((item, index) => {
						return (
							<SettlementItem
								contentText={props.contentText}
								data={item}
								key={index} />
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default PaymentSettlement;