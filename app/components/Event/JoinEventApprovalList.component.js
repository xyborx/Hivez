import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import ConfirmModal from '../Modal/ConfirmModal.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import SearchField from '../TextField/SearchField.component';
import styles from './JoinEventApprovalList.component.style';

const UserItem = (props) => {
	const {id, image, name, username} = props.userData;
	return (
		<View style={styles.userItemContainer}>
			<Image
				source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
				style={styles.userImage}/>
			<View style={styles.userDetailContainer}>
				<Text style={styles.settingsItemText}>{name}</Text>
				<Text style={styles.userUsername}>{`@${username}`}</Text>
			</View>
			<View style={styles.userActionContainer}>
				<ConfirmModal action={() => props.approveJoin(id)} contentText={props.confirmApproveJoinText} opacityButton={true} style={styles.userActionItem}>
					<View>
						<FontAwesome5 name={'check'} style={styles.userActionIcon} />
						<Text style={styles.userTextDetailWithMargin}>{props.contentText['APPROVE']}</Text>
					</View>
				</ConfirmModal>
				<ConfirmModal action={() => props.rejectJoin(id)} contentText={props.confirmRejectJoinText} opacityButton={true} style={styles.userActionItem}>
					<View>
						<FontAwesome5 name={'times'} style={styles.userActionIcon} />
						<Text style={styles.userTextDetailWithMargin}>{props.contentText['REJECT']}</Text>
					</View>
				</ConfirmModal>
			</View>
		</View>
	);
};

const JoinEventApprovalList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<FloatingBurgerButton action={props.openDrawer} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.eventData.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${props.eventData.image}`}}
						style={styles.eventImage}/>
					<Text style={styles.eventName}>{props.eventData.name}</Text>
					<View style={styles.sectionContainer}>
						<SearchField
							onChangeText={props.onChangeSearch}
							placeholder={props.contentText['SEARCH_PLACEHOLDER']}
							style={styles.searchField}
							value={props.searchValue} />
						{(props.userList.length === 0) ? 
							<View style={styles.emptyList}>
								<Text style={styles.emptyListText}>{props.contentText['EMPTY_SEARCH_RESULT']}</Text>
							</View>
						: props.userList.map(item => {
							return(
								<UserItem
									{...props}
									key={item.id}
									userData={item} />
							);
						})}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default JoinEventApprovalList;