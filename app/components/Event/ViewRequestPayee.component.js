import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {rupiahFormatting} from '../../utils/helper.utils';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import SearchField from '../TextField/SearchField.component';
import styles from './ViewRequestPayee.component.style';

const MemberItem = (props) => {
	const {id, image, name, role, username, expense} = props.memberData;
	return (
		<View style={styles.memberItemContainer}>
			<Image
				source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
				style={styles.memberImage}/>
			<View style={styles.memberDetailContainer}>
				<Text style={styles.memberName}>{`${name}${props.isCurrentUser ? (' (' + props.contentText['YOU'] + ')') : ''}`}</Text>
				<Text style={styles.memberRole}>{`@${username} - ${props.contentText[role]}`}</Text>
			</View>
			<View style={styles.actionContainer}>
				<Text style={styles.expense}>{rupiahFormatting(expense)}</Text>
			</View>
		</View>
	);
};

const SelectRequestPayee = (props) => {
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
							{(props.eventMember.length === 0) ? 
								<View style={styles.emptyList}>
									<Text style={styles.emptyListText}>{props.contentText['EMPTY_SEARCH_RESULT']}</Text>
								</View>
							: props.eventMember.map((item, index) => {
								return(
									<MemberItem {...props} key={item.id} isCurrentUser={item.id === props.currentUser} memberData={item}/>
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SelectRequestPayee;