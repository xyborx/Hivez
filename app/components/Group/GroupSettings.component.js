import React from 'react';
import {Image, ScrollView, Switch, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import {getRelativeDate} from '../../utils/date.utils';
import ConfirmModal from '../Modal/ConfirmModal.component';
import ChangeGroupDataModal from '../Modal/ChangeGroupDataModal.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import theme from '../../styles/theme.style';
import styles from './GroupSettings.component.style';

const ButtonWithIcon = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={1}
			onPress={props.action}
			style={styles.settingsItem}
			underlayColor={'rgba(0,0,0,0.05)'}>
			<View style={styles.settingsItemContainer}>
				<Text style={styles.settingsItemText}>{props.actionName}</Text>
				<FontAwesome5 name={props.actionIcon} style={styles.settingsItemIcon} />
			</View>
		</TouchableHighlight>
	);
};

const ButtonWithSwitch = (props) => {
	return (
		<View style={[styles.settingsItem, styles.settingsItemContainer]}>
			<Text style={styles.settingsItemText}>{props.title}</Text>
			<Switch
				trackColor={{ false: theme.COLOR_GREY, true: theme.COLOR_PRIMARY }}
				thumbColor={theme.COLOR_WHITE}
				onValueChange={props.switchOnChange}
				value={props.switchValue} />
		</View>
	);
};

const MemberItem = (props) => {
	const {id, image, joinDate, name, role} = props.memberData;
	return (
		<View style={styles.memberItemContainer}>
			<Image
				source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
				style={styles.memberImage}/>
			<View style={styles.memberDetailContainer}>
				<Text style={styles.settingsItemText}>{name}</Text>
				<Text style={styles.memberRole}>{props.contentText[role]}</Text>
				<Text style={styles.memberJoinDate}>{`${props.contentText['JOIN']} ${getRelativeDate(joinDate).toLowerCase()}`}</Text>
			</View>
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.settingsItem, styles.settingsItemContainer]}>
			<Text style={styles.settingsItemText}>{props.title}</Text>
			<Text style={styles.settingsItemValue}>{props.value}</Text>
		</View>
	);
};

const GroupSettings = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<FloatingBurgerButton action={props.openDrawer} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.groupData.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.groupData.image}`}}
						style={styles.groupImage}/>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['GROUP_PICTURE']}</Text>
						<DropdownChangePicture
							contentText={props.dropdownChangePictureText}
							onChange={props.onChangeGroupPictureDropdown}>
							<ButtonWithIcon
								actionIcon={'camera'}
								actionName={props.contentText['EDIT_GROUP_PICTURE']} />
						</DropdownChangePicture>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['GROUP_DATA']}</Text>
						<ViewWithValue
							title={props.contentText['GROUP_NAME']}
							value={props.groupData.name} />
						<ViewWithValue
							title={props.contentText['GROUP_DESCRIPTION']}
							value={props.groupData.description} />
						<ButtonWithSwitch
							switchOnChange={props.toggleAllowSearchByName}
							switchValue={props.groupData.allowSearchByName}
							title={props.contentText['ALLOW_SEARCH_BY_GROUP_NAME']} />
						<ChangeGroupDataModal saveData={props.changeGroupData} data={props.groupData} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={styles.settingsItemText}>{props.contentText['EDIT_GROUP_DATA']}</Text>
								<FontAwesome5 name={'pen'} style={styles.settingsItemIcon} />
							</View>
						</ChangeGroupDataModal>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.groupMembers.length > 0 ? `${props.contentText['GROUP_MEMBER']} (${props.groupMembers.length})` : props.contentText['GROUP_MEMBER']}</Text>
						<View>
							{props.groupMembers.slice(0, 5).map(item => <MemberItem contentText={props.contentText} key={item.id} memberData={item} />)}
						</View>
						<ButtonWithIcon
							action={props.editGroupMember}
							actionIcon={'user-edit'}
							actionName={props.contentText['EDIT_GROUP_MEMBER']} />
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['PAGE_TITLE']}</Text>
						<ConfirmModal contentText={props.confirmLeaveGroupText} action={props.leaveGroup} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={styles.settingsItemText}>{props.contentText['LEAVE_GROUP']}</Text>
								<FontAwesome5 name={'door-open'} style={styles.settingsItemIcon} />
							</View>
						</ConfirmModal>
						<ConfirmModal contentText={props.confirmDeleteGroupText} action={props.deleteGroup} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={styles.settingsItemText}>{props.contentText['DELETE_GROUP']}</Text>
								<FontAwesome5 name={'trash'} style={styles.settingsItemIcon} />
							</View>
						</ConfirmModal>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupSettings;