import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import NotificationList from '../NotificationList/NotificationList.component';
import styles from './Notification.component.style';

const Notification = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
		<ScrollView ref={props.scrollRef} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
			<View style={styles.pageContentView}>
				<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
				<NotificationList
					contentText={props.contentText}
					notificationList={props.notificationList}
					onGroupClick={props.onGroupClick}
					onEventClick={props.onEventClick}
					onEventRequestDetailClick={props.onEventRequestDetailClick}
					onGroupRequestDetailClick={props.onGroupRequestDetailClick}
					onGroupBillApprovalClick={props.onGroupBillApprovalClick}
					onGroupBillDetailClick={props.onGroupBillDetailClick} />
			</View>
		</ScrollView>
		</SafeAreaView>
	);
}

export default Notification;