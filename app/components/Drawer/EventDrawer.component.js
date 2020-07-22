import React, {useContext} from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {UserContext} from '../../contexts/user.context';
import ConfirmModal from '../Modal/ConfirmModal.component';
import styles from './EventDrawer.component.style';

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

const EventDrawer = ({state, descriptors, navigation}) => {
	const {translations} = useContext(LocalizationContext);
	const {eventData} = useContext(EventContext);
	const {userData} = useContext(UserContext);
	
	const eventID = state ? state.routes[state.index].params.eventID : '';

	const leaveEvent = (eventID) => {
		navigation.closeDrawer();
		navigation.replace('EventList');
		alert(`User ${userData.id} leave event: ${eventID}`);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} >
			<View style={styles.headerContainer}>
				<Image
					source={eventData.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${eventData.image}`}}
					style={styles.eventImage}/>
				<Text style={styles.header}>{eventData.name}</Text>
				<Text style={styles.subHeader}>{`${translations['EventDrawerNavigator'][eventData.role]}`}</Text>
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
							eventID: eventID
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
						text={translations['EventDrawerNavigator'][options.text]} />
				);
			})}
			<ConfirmModal
				contentText={translations['ConfirmLeaveEvent']}
				action={() => leaveEvent(eventID)}
				style={styles.button}>
				<View style={styles.buttonContainer}>
					<FontAwesome5 name={'door-open'} solid style={[styles.buttonIcon, styles.leave]} />
					<Text style={[styles.buttonText, styles.leave]}>{translations['EventDrawerNavigator']['LEAVE_EVENT']}</Text>
				</View>
			</ConfirmModal>
		</ScrollView>
	);
};

export default EventDrawer;