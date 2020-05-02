import React from 'react';
import {Image, SectionList, Text, TouchableHighlight, View} from 'react-native';
import {getRelativeDate} from '../../utils/date.utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './NotificationList.component.style';

const NotificationItem = (props) => {
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			underlayColor={'rgba(0,0,0,0.05)'}
			onPress={() => {if(props.clickable) props.onPress()}}>
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

const NotificationList = (props) => {
	return (
		<SectionList
			keyboardShouldPersistTaps={'handled'}
			keyExtractor={item => item.id}
			showsVerticalScrollIndicator={false}
			sections={props.notificationList}
			stickySectionHeadersEnabled={true}
			style={[styles.flatList, props.style]}
			renderSectionHeader={({ section: { title } }) => (
				<View style={styles.headerContainer}>
					<Text style={styles.header}>{props.contentText[title]}</Text>
				</View>
			)}
			renderItem={({item}) => {
				const date = getRelativeDate(item.date);
				const detail = (item.title.indexOf('REQUEST') >= 0 || item.title.indexOf('BILL') >= 0) ? `${item.sourceName} - ${item.detail}` : item.sourceName;
				const title = props.contentText[item.title].replace('{source_name}', item.sourceName).replace('{status}', props.contentText[item.detail]);
				const clickable = !(['JOIN_REJECTED', 'LEFT', 'REMOVED'].includes(item.title));
				const onPress = () => {
					if (item.source === 'GROUP') props.onGroupClick(item.sourceID);
					else if (item.source === 'EVENT') props.onEventClick(item.sourceID);
					else if (item.source === 'TRANSACTION') props.onTransactionClick(item.sourceID);
					else if (item.source === 'BILL') props.onBillClick(item.sourceID);
				};
				return (
					<NotificationItem
						clickable={clickable}
						date={date}
						detail={detail}
						image={item.sourceImage}
						key={item.id}
						onPress={onPress}
						title={title}/>
				);
			}} />
	);
}

export default NotificationList;