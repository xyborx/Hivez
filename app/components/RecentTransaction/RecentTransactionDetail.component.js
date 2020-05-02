import React, {useState} from 'react';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getRelativeDate} from '../../utils/date.utils';
import {padArray, rupiahFormatting} from '../../utils/helper.utils';
import styles from './RecentTransactionDetail.component.style';

const TransactionItem = (props) => {
	const {id, name, date, approver, type, value, status} = props.item;
	const details = props.contentText[`${status.toUpperCase().replace(' ', '_')}_TRANSACTIONS`]
		+ (status === 'On Progress' ? '' : ` ${props.contentText['BY']} ${approver}`);
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			onPress={() => {props.onPress(id)}}
			underlayColor={'rgba(0,0,0,0.05)'}
			style={styles.transactionItem}>
			<View style={styles.transactionItem}>
				<View style={styles.transactionDescriptionContainer}>
					<View style={styles.transactionTitleContainer}>
						<Text style={styles.transactionName}>{name}</Text>
						<Text style={styles.transactionDetail}>{details}</Text>
						<Text style={styles.transactionDate}>{getRelativeDate(date)}</Text>
					</View>
					<View style={styles.transactionValueContainer}>
						<Text style={[type === 'Credit' ? styles.credit : styles.debit, styles.transactionValue]}>{rupiahFormatting(value)}</Text>
						<FontAwesome5 name={'angle-right'} style={styles.transactionDetailIcon} />
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const EmptyItem = () => {
	return (
		<TouchableHighlight style={styles.transactionItem}>
			<View style={styles.transactionItem}>
				<View style={styles.transactionDescriptionContainer}>
					<View style={styles.transactionTitleContainer}>
						<Text style={styles.transactionName}></Text>
						<Text style={styles.transactionDetail}></Text>
						<Text style={styles.transactionDate}></Text>
					</View>
					<View style={styles.transactionValueContainer}>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
}

const RecentTransactionDetail = (props) => {
	const [filterType, setFilterType] = useState('All');
	const [transactionList, setTransactionList] = useState(padArray(props.transactionList, 5, null));

	const filterData = (type) => {
		setFilterType(type);
		if (type === 'All') setTransactionList(padArray(props.transactionList, 5, null));
		else setTransactionList(padArray(props.transactionList.filter((item) => {return item.status === type}), 5, null));
	}

	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.headerSecion}>
				<View style={styles.headerTextContainer}>
					<Text style={styles.headerText}>{props.contentText['TITLE']}</Text>
					<Text style={styles.subHeaderText}>{props.contentText['LAST_FIVE_TRANSACTIONS']}</Text>
				</View>
				<TouchableOpacity accessibilityRole={'button'}  style={styles.allTransactionButton}>
					<Text style={styles.allTransactionText}>{props.contentText['SEE_ALL_TRANSACTIONS']}</Text>
					<FontAwesome5 name={'angle-right'} style={styles.allTransactionIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.filterList}>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('All')}}
					style={[styles.filterButton, filterType === 'All' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'All' ? styles.filterTextActive : {}]}>{props.contentText['ALL_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('Approved')}}
					style={[styles.filterButton, filterType === 'Approved' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'Approved' ? styles.filterTextActive : {}]}>{props.contentText['APPROVED_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('On Progress')}}
					style={[styles.filterButton, filterType === 'On Progress' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'On Progress' ? styles.filterTextActive : {}]}>{props.contentText['ON_PROGRESS_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('Declined')}}
					style={[styles.filterButton, filterType === 'Declined' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'Declined' ? styles.filterTextActive : {}]}>{props.contentText['DECLINED_TRANSACTIONS']}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.transactionListContainer}>
				<Text style={transactionList.length ? styles.hidden : styles.noRecentTransaction}>{props.contentText['NO_RECENT_TRANSACTION']}</Text>
				{transactionList.slice(0, 5).map((item, index) => {
					if (item === null) return (<EmptyItem key={index} />);
					return (
						<TransactionItem
							contentText={props.contentText}
							item={item}
							key={index}
							onPress={props.onItemClick} />
					);
				})}
			</View>
		</View>
	);
}

export default RecentTransactionDetail;