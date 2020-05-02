import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './PendingApprovalCard.component.style';

const ApprovalItemButton = (props) => {
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			underlayColor={'rgba(0,0,0,0.05)'}
			onPress={props.onPress} >
			<View style={styles.approvalItem}>
				<FontAwesome5 name={props.icon} style={styles.approvalItemIcon} />
				<View style={styles.approvalDescriptionContainer}>
					<Text style={styles.actionName}>{props.itemName}</Text>
					<View style={styles.transactionValueContainer}>
						<Text style={styles.actionName}>{props.count}</Text>
						<FontAwesome5 name={'angle-right'} style={styles.actionDetailIcon} />
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const PendingApprovalCard = (props) => {
	return (
		<View style={[styles.container, props.style]}>
			<Text style={styles.header}>{props.contentText['PENDING_APPROVAL']}</Text>
			<Text style={styles.subHeader}>{props.contentText['THIS_LIST_WAITING_YOUR_APPROVAL']}</Text>
			{props.pendingApprovalList.map((item, index) => {
				return (
					<ApprovalItemButton
						count={item.count}
						itemName={props.contentText[item.type]}
						icon={item.icon}
						key={index}
						onPress={item.action} />
				)
			})}
		</View>
	);
};

export default PendingApprovalCard;