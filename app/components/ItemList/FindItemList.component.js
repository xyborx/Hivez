import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ConfirmModal from '../Modal/ConfirmModal.component';
import styles from './FindItemList.component.style';

const CardItemList = (props) => {
	if (props.dataList.length === 0) {
		return (
			<View style={styles.emptyList}>
				<Text style={styles.emptyListText}>{props.emptyText}</Text>
			</View>
		);
	};
	return (
		props.dataList.map((item) => {
			return (
				<ConfirmModal
					action={() => {props.onItemClick(item.id)}}
					contentText={props.confirmJoinText}
					key={item.id}
					style={styles.listItemButton} >
					<View style={styles.listItem}>
						<Image
							source={item.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${item.image}`}}
							style={styles.listImage}/>
						<View style={styles.listDescriptionContainer}>
							<Text style={styles.listTitle}>{`${item.name} (${item.memberCount})`}</Text>
							<Text style={styles.listDescription}>{`${item.description}`}</Text>
						</View>
						<View style={styles.listActionContainer}>
							<FontAwesome5 name={'sign-in-alt'} style={styles.listActionIcon} />
							<Text style={styles.listActionText}>{props.contentText['JOIN']}</Text>
						</View>
					</View>
				</ConfirmModal>
			);
		}));
}

export default CardItemList;