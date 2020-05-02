import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import NotificationList from '../NotificationList/NotificationList.component';
import styles from './Notification.component.style';

const Notification = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.pageContainer}>
				<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
				<View style={styles.notificationListContainer} >
					<NotificationList
						contentText={props.contentText}
						notificationList={props.notificationList} 
						onGroupClick={props.onGroupClick}
						onEventClick={props.onEventClick}
						onTransactionClick={props.onTransactionClick}
						onBillClick={props.onBillClick}
						/>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default Notification;