import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeAreaView from 'react-native-safe-area-view';
import {rupiahFormatting} from '../../utils/helper.utils';
import Button from '../Button/Button.component';
import ChangePayeeValueModal from '../Modal/ChangePayeeValueModal.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import NumberField from '../TextField/NumberField.component';
import SearchField from '../TextField/SearchField.component';
import SwitchButton from '../Button/SwitchButton.component';
import styles from './SelectRequestPayee.component.style';

const MemberItem = (props) => {
	const {id, image, name, role, username, expense} = props.memberData;
	return (
		props.type === 'SIMPLE' ? (
			<TouchableHighlight
				activeOpacity={1}
				underlayColor={'rgba(0,0,0,0.05)'}
				onPress={() => props.updateEventMember(id, 50000)}>
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
						<FontAwesome5 name={expense === 0 ? 'circle' : 'check-circle'} style={styles.actionIcon} />
					</View>
				</View>
			</TouchableHighlight>
		) : (
			<ChangePayeeValueModal saveData={(value) => props.updateEventMember(id, value)} value={expense}>
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
			</ChangePayeeValueModal>
		)
	);
};

const SelectRequestPayee = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['CANCEL']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.eventData.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${props.eventData.image}`}}
						style={styles.eventImage}/>
					<Text style={styles.eventName}>{props.eventData.name}</Text>
					<SwitchButton
						style={styles.switch}
						leftValue={'SIMPLE'}
						rightValue={'ADVANCED'}
						onChange={props.setType}
						text={props.contentText}
						value={props.type} />
					<View style={styles.sectionContainer}>
						<NumberField
							editable={false}
							textStyle={styles.expense}
							style={styles.numberField}
							value={props.maxExpense} />
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
									<MemberItem {...props} key={item.id} isCurrentUser={index === 0} memberData={item} />
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.floatingContainer}>
				<View style={styles.configButtonContainer}>
					<Button
						accessability={true} 
						onPress={props.selectAll}
						style={props.type === 'SIMPLE' ? [styles.configButton, styles.configButtonLeft] : styles.hidden}
						text={props.contentText['SELECT_ALL']} />
					<Button
						accessability={true} 
						onPress={props.reset}
						style={[styles.configButton, props.type === 'SIMPLE' ? styles.configButtonRight : {}]}
						text={props.contentText['RESET']} />
				</View>
				<Button
					accessability={props.saveButtonAccessbility} 
					onPress={props.save}
					style={styles.button}
					text={props.contentText['SAVE']} />
			</View>
		</SafeAreaView>
	);
}

export default SelectRequestPayee;