import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {getRelativeDate} from '../../utils/date.utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './NotificationList.component.style';

const NotificationItem = (props) => {
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			underlayColor={'rgba(0,0,0,0.05)'}
			onPress={() => {if(props.clickable) props.onPress(props.id)}}>
			<View style={styles.listItem}>
				<Image
					source={props.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.image}`}}
					style={styles.listImage}/>
				<View style={styles.listDetailContainer}>
					<Text style={styles.listTitle}>{props.title}</Text>
					<Text style={styles.listDetail}>{props.detail}</Text>
					<Text style={styles.listDate}>{props.date}</Text>
				</View>
				<FontAwesome5 name={'angle-right'} style={props.clickable ? styles.listIcon : styles.hidden} />
				<View style={styles.listIconContainer}>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const NotificationSection = (props) => {
	return (
		<View style={props.data.length === 0 ? styles.hidden : styles.headerContainer}>
			<Text style={styles.header}>{props.contentText[props.title]}</Text>
			{props.data.map((item) => {
				const date = getRelativeDate(item.date);
				const detail = (item.title.indexOf('REQUEST') >= 0 || item.title.indexOf('BILL') >= 0) ? `${item.sourceName} - ${item.detail}` : item.sourceName;
				const title = props.contentText[item.title].replace('{source_name}', item.sourceName).replace('{status}', props.contentText[item.detail]);
				const clickable = !(['JOIN_REJECTED', 'LEFT', 'REMOVED'].includes(item.title));
				return (
					<NotificationItem
						id={item.sourceID}
						clickable={clickable}
						date={date}
						detail={detail}
						image={item.sourceImage}
						key={item.id}
						onPress={
							item.source === 'GROUP' ? props.onGroupClick :
							item.source === 'EVENT' ? props.onEventClick :
							item.source === 'EVENT_TRANSACTION' ? props.onEventTransactionClick :
							item.source === 'GROUP_TRANSACTION' ? props.onGroupTransactionClick :
							item.source === 'BILL' ? props.onBillClick :
							() => {}
						}
						title={title}/>
				);
			})}
		</View>
	);
};

const NotificationList = (props) => {
	let isEmpty = true;
	props.notificationList.map(item => {if(item.data.length > 0) isEmpty = false});
	if (isEmpty) {
		return (
			<View style={styles.emptyList}>
				<Text style={styles.emptyListText}>{props.contentText['EMPTY_NOTIFICATION']}</Text>
			</View>
		);
	};
	return (
		props.notificationList.map((item, index) => {
			return (
				<NotificationSection
					contentText={props.contentText}
					data={item.data}
					key={index}
					onGroupClick={props.onGroupClick}
					onEventClick={props.onEventClick}
					onEventTransactionClick={props.onEventTransactionClick}
					onGroupTransactionClick={props.onGroupTransactionClick}
					title={item.title} />
			);
		})
	);
}

export default NotificationList;