import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import {getRelativeDate} from '../../utils/date.utils';
import ConfirmModal from '../Modal/ConfirmModal.component';
import DropdownChangeRole from '../Dropdown/DropdownChangeRole.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import SearchField from '../TextField/SearchField.component';
import styles from './EditEventMember.component.style';

const MemberItem = (props) => {
	const {id, image, joinDate, name, role, username} = props.memberData;
	return (
		<View style={styles.memberItemContainer}>
			<Image
				source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
				style={styles.memberImage}/>
			<View style={styles.memberDetailContainer}>
				<Text style={styles.memberName}>{`${name}${props.isCurrentUser ? (' (' + props.contentText['YOU'] + ')') : ''}`}</Text>
				<Text style={styles.memberRole}>{`@${username} - ${props.contentText[role]}`}</Text>
				<Text style={styles.memberTextDetailWithMargin}>{`${props.contentText['JOIN']} ${getRelativeDate(joinDate).toLowerCase()}`}</Text>
			</View>
			<View style={styles.memberActionContainer}>
				<DropdownChangeRole
					contentText={props.dropdownChangeRoleText}
					confirmChangeRoleText={props.confirmChangeRoleText}
					currentValue={role}
					opacityButton={true}
					onChange={role => props.changeUserRole(id, role)}>
					<View style={styles.memberActionItem}>
						<FontAwesome5 name={'user-cog'} style={styles.memberActionIcon} />
						<Text style={styles.memberTextDetailWithMargin}>{props.contentText['CHANGE_ROLE']}</Text>
					</View>
				</DropdownChangeRole>
				<ConfirmModal action={props.removeUser} contentText={props.confirmRemoveText} opacityButton={true} style={styles.memberActionItem}>
					<View>
						<FontAwesome5 name={'user-minus'} style={styles.memberActionIcon} />
						<Text style={styles.memberTextDetailWithMargin}>{props.contentText['REMOVE']}</Text>
					</View>
				</ConfirmModal>
			</View>
		</View>
	);
};

const EditEventMember = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
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
									<Text style={styles.emptyListText}>{props.contentText['NO_MEMBER_FOUND']}</Text>
								</View>
							: props.eventMembers.map((item, index) => {
								return(
									<MemberItem {...props} key={item.id} isCurrentUser={index === 0} memberData={item} removeUser={() => props.removeUser(item.id)} />
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EditEventMember;