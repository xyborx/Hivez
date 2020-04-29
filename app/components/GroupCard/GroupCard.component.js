import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconButton from '../Button/IconButton.component';
import styles from './GroupCard.component.style';

const GroupCard = (props) => {
	return (
		<View key={props.groupData.groupID} style={styles.itemCard}> 
			<View style={styles.groupContainer}>
				<TouchableOpacity style={styles.groupDataContainer}>
					<Image
						source={props.groupData.groupImage === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.groupData.groupImage}`}}
						style={styles.groupImage} />
					<View style={styles.groupDetails}>
						<View style={{flexDirection: 'column'}}>
							<Text style={styles.groupName}>{props.groupData.groupName}</Text>
							<Text style={styles.groupDescription}>{props.groupData.groupDescription}</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={props.expandable ? styles.expandButton : styles.hidden}
					onPress={() => {props.setDisplayDetails(!props.displayDetails)}}>
					<View style={styles.expandWrapper}>
						<FontAwesome5 name={props.displayDetails ? 'angle-up' : 'angle-down'} style={styles.expandIcon}/>
					</View>
				</TouchableOpacity>
			</View>
			<View style={props.displayDetails ? styles.actionContainer : styles.hidden}>
				{props.groupData.groupAction.map((item, index) => {
					return(
						<IconButton
							icon={item.actionIcon}
							key={index}
							onPress={item.action}
							style={styles.iconButton}
							text={props.contentText[item.actionName]} />
					);
				})}
			</View>
		</View>
	);
};

export default GroupCard;