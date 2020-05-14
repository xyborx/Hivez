import React from 'react';
import {Image, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {rupiahFormatting} from '../../utils/helper.utils';
import {getDay, getMonthYear, getWeekDay, timeToString} from '../../utils/date.utils';
import Button from '../Button/Button.component';
import DateRangePicker from '../Date/DateRangePicker.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import styles from './EventReport.component.style';

const TransactionItem = (props) => {
	const {id, name, date, requester, image, type, value, source} = props.data;
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			onPress={() => {props.onPress(id)}}
			underlayColor={'rgba(0,0,0,0.05)'}
			style={styles.transactionItem}>
			<View style={styles.transactionItem}>
				<Image
					source={image === '' ? require('../../assets/images/DefaultProfileImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
					style={styles.profileImage}/>
				<View style={styles.transactionTitleContainer}>
					<Text style={styles.transactionName}>{name}</Text>
					<Text style={styles.transactionDetail}>{requester}</Text>
					<Text style={styles.transactionDate}>{timeToString(date)}</Text>
				</View>
				<View style={styles.transactionValueContainer}>
					<Text style={styles.transactionValue}>{rupiahFormatting(value)}</Text>
					<FontAwesome5 name={'angle-right'} style={styles.transactionDetailIcon} />
				</View>
			</View>
		</TouchableHighlight>
	);
};

const TransactionSection = (props) => {
	return (
		<View style={styles.sectionContainer}>
			<View style={styles.dateTitle}>
				<Text style={styles.dateTitleDay}>{getDay(props.date)}</Text>
				<View style={styles.dateDetails}>
					<Text style={styles.dateTitleWeekDay}>{getWeekDay(props.date)}</Text>
					<Text style={styles.dateTitleMonthYear}>{getMonthYear(props.date)}</Text>
				</View>
				<Text style={styles.dailyValue}>{rupiahFormatting(props.sum)}</Text>
			</View>
			{props.data.map(item => {
				return (
					<TransactionItem
						contentText={props.contentText}
						data={item}
						key={item.id}
						onPress={props.viewEventRequestDetail}/>
				);
			})}
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.transactionOverviewContainer, props.style]}>
			<Text style={styles.transactionOverviewText}>{props.title}</Text>
			<Text style={[styles.transactionOverviewText, styles.expense]}>{props.value}</Text>
		</View>
	);
};

const EventReport = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<FloatingBurgerButton action={props.openDrawer} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.eventDetail.image === '' ? require('../../assets/images/DefaultEventImage.png') : {uri: `data:image/jpeg;base64,${props.eventDetail.image}`}}
						style={styles.eventImage}/>
					<Text style={styles.eventName}>{props.eventDetail.name}</Text>
					<View style={[styles.sectionContainer, styles.sectionContainerWithPadding]}>
						<Text style={styles.headerText}>{props.contentText['SUMMARY']}</Text>
						<ViewWithValue
							title={props.contentText['TOTAL_EXPENSES']}
							style={styles.marginTop}
							value={rupiahFormatting(props.reportDetail.totalExpense)} />
						<Button
							accessability={true} 
							onPress={props.viewPaymentSettlement}
							style={styles.button}
							text={props.contentText['VIEW_SETTLEMENT']} />
						<Button
							accessability={true} 
							onPress={props.downloadReport}
							style={styles.button}
							text={props.contentText['DOWNLOAD_REPORT']} />
					</View>
					{props.transactionList.map((item, index) => {
						return (
							<TransactionSection
								contentText={props.contentText}
								data={item.data}
								date={item.id}
								key={index}
								sum={item.sum}
								viewEventRequestDetail={props.viewEventRequestDetail} />
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default EventReport;