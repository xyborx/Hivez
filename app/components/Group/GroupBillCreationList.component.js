import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {rupiahFormatting} from '../../utils/helper.utils';
import {getRelativeDate} from '../../utils/date.utils';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import SearchField from '../TextField/SearchField.component';
import SwitchButton from '../Button/SwitchButton.component';
import styles from './GroupBillCreationList.component.style';

const BillItem = (props) => {
	const {id, name, date, value, requester, image} = props.data;
	const detail = `${props.contentText['REQUESTED_BY']} ${requester}`;
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			onPress={() => {props.onPress(id)}}
			underlayColor={'rgba(0,0,0,0.05)'}
			style={styles.billItem}>
			<View style={styles.billItem}>
				<Image
					source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
					style={styles.userImage}/>
				<View style={styles.billTitleContainer}>
					<Text style={styles.billName}>{name}</Text>
					<Text style={styles.billDetail}>{detail}</Text>
					<Text style={styles.billDate}>{getRelativeDate(date)}</Text>
				</View>
				<View style={styles.billValueContainer}>
					<Text style={[styles.income, styles.billValue]}>{rupiahFormatting(value)}</Text>
					<FontAwesome5 name={'angle-right'} style={styles.billDetailIcon} />
				</View>
			</View>
		</TouchableHighlight>
	);
};

const GroupBillCreationList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<FloatingBurgerButton action={props.openDrawer} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.groupDetail.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.groupDetail.image}`}}
						style={styles.groupImage}/>
					<Text style={styles.groupName}>{props.groupDetail.name}</Text>
					<SwitchButton
						leftValue={'NOT_COMPLETED'}
						rightValue={'COMPLETED'}
						onChange={props.setDisplayedBillStatus}
						style={styles.switch}
						text={props.contentText}
						value={props.displayedBillStatus} />
					<View style={styles.sectionContainer}>
						<SearchField
							onChangeText={props.onChangeSearch}
							placeholder={props.contentText['SEARCH_PLACEHOLDER']}
							style={styles.searchField}
							value={props.searchValue} />
						{(props.billList.length === 0) ? 
								<View style={styles.emptyList}>
									<Text style={styles.emptyListText}>{props.searchValue === '' ? props.contentText['DEFAULT_TEXT'] : props.contentText['EMPTY_SEARCH_RESULT']}</Text>
								</View>
						: props.billList.map(item => {
							return (
								<BillItem
									contentText={props.contentText}
									data={item}
									key={item.id}
									onPress={props.navigateToBillDetail} />
							);
						})}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupBillCreationList;