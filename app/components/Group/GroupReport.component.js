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
import styles from './GroupReport.component.style';

const TransactionItem = (props) => {
	const {id, name, date, requester, type, value, source} = props.data;
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			onPress={() => {props.onPress(id)}}
			underlayColor={'rgba(0,0,0,0.05)'}
			style={styles.transactionItem}>
			<View style={styles.transactionItem}>
				<View style={styles.transactionTitleContainer}>
					<Text style={styles.transactionName}>{name}</Text>
					<Text style={styles.transactionDetail}>{requester}</Text>
					<Text style={styles.transactionDate}>{timeToString(date)}</Text>
				</View>
				<View style={styles.transactionValueContainer}>
					<Text style={[type === 'INCOME' ? styles.income : styles.expense, styles.transactionValue]}>{rupiahFormatting(value)}</Text>
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
				<Text style={[styles.dailyValue, props.sum < 0 ? styles.expense : styles.income]}>{rupiahFormatting(props.sum)}</Text>
			</View>
			{props.data.map(item => {
				return (
					<TransactionItem
						contentText={props.contentText}
						data={item}
						key={item.id}
						onPress={item.source === 'BILL' ? props.viewBillDetail : props.viewTransactionDetail}/>
				);
			})}
		</View>
	);
};

const ViewWithValue = (props) => {
	return (
		<View style={[styles.transactionOverviewContainer, props.style]}>
			<Text style={styles.transactionOverviewText}>{props.title}</Text>
			<Text style={[styles.transactionOverviewText, props.valueStyle]}>{props.value}</Text>
		</View>
	);
};

const GroupReport = (props) => {
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
					<View style={[styles.sectionContainer, styles.sectionContainerWithPadding]}>
						<Text style={styles.headerText}>{props.contentText['SELECT_DATE']}</Text>
						<DateRangePicker
							onChangeStartDate={props.setStartDate}
							onChangeEndDate={props.setEndDate}
							shortDate={true}
							startDateValue={props.startDate}
							endDateValue={props.endDate}
							style={styles.dateField} />
						<View style={styles.rowColumn}>
							<Button
								accessability={true} 
								onPress={props.resetDate}
								style={[styles.rowButton, styles.rowButtonLeft]}
								text={props.contentText['RESET']} />
							<Button
								accessability={true} 
								onPress={props.viewReport}
								style={[styles.rowButton, styles.rowButtonRight]}
								text={props.contentText['VIEW_REPORT']} />
						</View>
					</View>
					<View style={props.showReport ? [styles.sectionContainer, styles.sectionContainerWithPadding] : styles.hidden}>
						<Text style={styles.headerText}>{props.contentText['SUMMARY']}</Text>
						<ViewWithValue
							title={props.contentText['OPENING_BALANCE']}
							style={styles.marginTop}
							value={rupiahFormatting(props.reportDetail.openingBalance)}
							valueStyle={props.reportDetail.openingBalance < 0 ? styles.expense : styles.income} />
						<ViewWithValue
							title={props.contentText['INCOME']}
							valueStyle={styles.income}
							value={rupiahFormatting(props.reportDetail.inflow)} />
						<ViewWithValue
							title={props.contentText['EXPENSE']}
							valueStyle={styles.expense}
							value={rupiahFormatting(props.reportDetail.outflow)} />
						<ViewWithValue
							title={props.contentText['ENDING_BALANCE']}
							value={rupiahFormatting(props.reportDetail.endingBalance)}
							valueStyle={props.reportDetail.endingBalance < 0 ? styles.expense : styles.income} />
						<Button
							accessability={true} 
							onPress={props.downloadReport}
							style={styles.button}
							text={props.contentText['DOWNLOAD_REPORT']} />
					</View>
					<View style={props.showReport ? {} : styles.hidden}>
						{props.transactionList.map((item, index) => {
							return (
								<TransactionSection
									contentText={props.contentText}
									data={item.data}
									date={item.id}
									key={index}
									sum={item.sum}
									viewBillDetail={props.viewBillDetail}
									viewTransactionDetail={props.viewTransactionDetail} />
							);
						})}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupReport;