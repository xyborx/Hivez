import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LocalizationContext} from '../../utils/language.utils';
import ConfirmModal from '../Modal/ConfirmModal.component';
import styles from './Drawer.component.style';

const DrawerItem = (props) => {
	return (
		<TouchableHighlight
			activeOpacity={1}
			accessibilityRole='button'
			onPress={() => {
				props.navigation.closeDrawer();
				props.onPress();
			}}
			style={[styles.button, props.isFocused ? styles.buttonFocused : {}]}
			underlayColor={props.isFocused ? '#FFC60B' : 'rgba(0,0,0,0.05)'}>
			<View style={styles.buttonContainer}>
				<FontAwesome5 name={props.icon} solid style={[styles.buttonIcon, props.textStyle, props.isFocused ? styles.buttonIconFocused : {}]} />
				<Text style={[styles.buttonText, props.textStyle, props.isFocused ? styles.buttonTextFocused : {}]}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	);
};

const Drawer = ({state, descriptors, navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const profileDetailDummy = {
		userID: '',
		name: 'Difa Sanditya',
		role: 'TREASURER'
	};

	const [profileDetail, setProfileDetail] = useState(profileDetailDummy);
	const [groupID, setGroupID] = useState(state ? state.routes[state.index].params.groupID : '');

	const leaveGroup = (groupID) => {
		alert(`Leave group: ${groupID}`);
	};

	const other = () => {
		alert('Click unhandled menu');
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} >
			<View style={styles.headerContainer}>
				<Text style={styles.header}>{`${translations['GroupDrawerNavigator']['HI']}, ${profileDetail.name}`}</Text>
				<Text style={styles.subHeader}>{`${translations['GroupDrawerNavigator'][profileDetail.role]}`}</Text>
			</View>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'draweItemPress',
						target: route.key,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, {
							...route.params,
							groupID: groupID
						});
					}
				};

				return (
					<DrawerItem
						icon={options.icon}
						isFocused={isFocused}
						key={index}
						navigation={navigation}
						onPress={onPress}
						text={translations['GroupDrawerNavigator'][options.text]} />
				);
			})}
			<DrawerItem
				icon={'cogs'}
				isFocused={false}
				navigation={navigation}
				onPress={other}
				text={translations['GroupDrawerNavigator']['GROUP_SETTINGS']} />
			<DrawerItem
				icon={'hand-holding-usd'}
				isFocused={false}
				navigation={navigation}
				onPress={() => navigation.navigate('CreateGroupTransaction', {groupID: groupID})}
				text={translations['GroupDrawerNavigator']['CREATE_REQUEST']} />
			<DrawerItem
				icon={'user-plus'}
				isFocused={false}
				navigation={navigation}
				onPress={other}
				text={translations['GroupDrawerNavigator']['INVITE_MEMBER']} />
			<ConfirmModal
				contentText={translations['ConfirmLeaveGroup']}
				action={() => {
					navigation.closeDrawer();
					leaveGroup(groupID);
				}}
				style={styles.button}>
				<View style={styles.buttonContainer}>
					<FontAwesome5 name={'door-open'} solid style={[styles.buttonIcon, styles.leave]} />
					<Text style={[styles.buttonText, styles.leave]}>{translations['GroupDrawerNavigator']['LEAVE_GROUP']}</Text>
				</View>
			</ConfirmModal>
		</ScrollView>
	);
};

export default Drawer;