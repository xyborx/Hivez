import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import ConfirmModal from '../Modal/ConfirmModal.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import SearchField from '../TextField/SearchField.component';
import styles from './InviteEventMember.component.style';

const MemberItem = (props) => {
	const {id, image, name, username} = props.memberData;
	return (
		<ConfirmModal action={props.action} contentText={props.confirmInviteMemberText}>
			<View style={styles.memberItemContainer}>
				<Image
					source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
					style={styles.memberImage}/>
				<View style={styles.memberDetailContainer}>
					<Text style={styles.settingsItemText}>{name}</Text>
					<Text style={styles.memberUsername}>{`@${username}`}</Text>
				</View>
				<View style={styles.memberActionContainer}>
						<View style={styles.memberActionItem}>
							<FontAwesome5 name={'user-plus'} style={styles.memberActionIcon} />
							<Text style={styles.memberTextDetailWithMargin}>{props.contentText['INVITE']}</Text>
						</View>
				</View>
			</View>
		</ConfirmModal>
	);
};

const InviteEventMember = (props) => {
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
						<View>
							{(props.eventMembers.length === 0) ? 
								<View style={styles.emptyList}>
									<Text style={styles.emptyListText}>{props.searchValue === '' ? props.contentText['DEFAULT_TEXT'] : props.contentText['EMPTY_SEARCH_RESULT']}</Text>
								</View>
							: props.eventMembers.map(item => {
								return(
									<MemberItem
										{...props}
										key={item.id}
										memberData={item}
										action={() => props.inviteEventMember(item.id)} />
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default InviteEventMember;