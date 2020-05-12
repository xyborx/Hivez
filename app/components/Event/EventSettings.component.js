import React from 'react';
import {Image, ScrollView, Switch, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import {getRelativeDate} from '../../utils/date.utils';
import ConfirmModal from '../Modal/ConfirmModal.component';
import ChangeEventDataModal from '../Modal/ChangeEventDataModal.component';
import DropdownChangePicture from '../Dropdown/DropdownChangePicture.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import PreviewPicture from '../Modal/PreviewPicture.component';
import theme from '../../styles/theme.style';
import styles from './EventSettings.component.style';

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
				<Text style={styles.settingsItemText}>{`${name}${props.isCurrentUser ? (' (' + props.contentText['YOU'] + ')') : ''}`}</Text>
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

const EventSettings = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<FloatingBurgerButton action={props.openDrawer} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<PreviewPicture
						closeText={props.contentText['CLOSE']}
						touchableType={'none'}
						image={props.eventData.image}
						style={styles.eventImageContainer} >
						<Image
							source={props.eventData.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${props.eventData.image}`}}
							style={styles.eventImage} />
					</PreviewPicture>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['EVENT_PICTURE']}</Text>
						<DropdownChangePicture
							contentText={props.dropdownChangePictureText}
							onChange={props.onChangeEventPictureDropdown}>
							<ButtonWithIcon
								actionIcon={'camera'}
								actionName={props.contentText['EDIT_EVENT_PICTURE']} />
						</DropdownChangePicture>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['EVENT_DATA']}</Text>
						<ViewWithValue
							title={props.contentText['EVENT_NAME']}
							value={props.eventData.name} />
						<ViewWithValue
							title={props.contentText['EVENT_DESCRIPTION']}
							value={props.eventData.description} />
						<ButtonWithSwitch
							switchOnChange={props.toggleAllowSearchByName}
							switchValue={props.eventData.allowSearchByName}
							title={props.contentText['ALLOW_SEARCH_BY_EVENT_NAME']} />
						<ChangeEventDataModal saveData={props.changeEventData} data={props.eventData} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={styles.settingsItemText}>{props.contentText['EDIT_EVENT_DATA']}</Text>
								<FontAwesome5 name={'pen'} style={styles.settingsItemIcon} />
							</View>
						</ChangeEventDataModal>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.eventMembers.length > 0 ? `${props.contentText['EVENT_MEMBER']} (${props.eventMembers.length})` : props.contentText['EVENT_MEMBER']}</Text>
						<View>
							{props.eventMembers.slice(0, 5).map((item, index) => <MemberItem contentText={props.contentText} isCurrentUser={index === 0} key={item.id} memberData={item} />)}
						</View>
						<ButtonWithIcon
							action={props.editEventMember}
							actionIcon={'user-edit'}
							actionName={props.contentText['EDIT_EVENT_MEMBER']} />
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>{props.contentText['PAGE_TITLE']}</Text>
						<ConfirmModal contentText={props.confirmLeaveEventText} action={props.leaveEvent} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={[styles.settingsItemText, styles.redText]}>{props.contentText['LEAVE_EVENT']}</Text>
								<FontAwesome5 name={'door-open'} style={[styles.settingsItemIcon, styles.redText]} />
							</View>
						</ConfirmModal>
						<ConfirmModal contentText={props.confirmDeleteEventText} action={props.deleteEvent} style={styles.settingsItem}>
							<View style={styles.settingsItemContainer}>
								<Text style={[styles.settingsItemText, styles.redText]}>{props.contentText['DELETE_EVENT']}</Text>
								<FontAwesome5 name={'trash'} style={[styles.settingsItemIcon, styles.redText]} />
							</View>
						</ConfirmModal>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EventSettings;