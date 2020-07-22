import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getRelativeDate} from '../../utils/date.utils';
import {padArray, rupiahFormatting} from '../../utils/helper.utils';
import styles from './RecentTransactionDetail.component.style';

const TransactionItem = (props) => {
	const {id, name, date, approver, image, type, value, status} = props.item;
	const details = props.contentText[`${status}_TRANSACTIONS`] + (status === 'ON_PROGRESS' ? '' : ` ${props.contentText['BY']} ${approver}`);
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
					style={styles.transactionImage}/>
				<View style={styles.transactionDescriptionContainer}>
					<View style={styles.transactionTitleContainer}>
						<Text style={styles.transactionName}>{name}</Text>
						<Text style={styles.transactionDetail}>{details}</Text>
						<Text style={styles.transactionDate}>{getRelativeDate(date)}</Text>
					</View>
					<View style={styles.transactionValueContainer}>
						<Text style={[type === 'INCOME' ? styles.income : styles.expense, styles.transactionValue]}>{rupiahFormatting(value)}</Text>
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
	const [filterType, setFilterType] = useState('ALL');
	const [displayedTransactionList, setDisplayedTransactionList] = useState(props.transactions);

	useEffect(() => {
		setDisplayedTransactionList(props.transactions)
	}, [props.transactions]);

	const filterData = (type) => {
		setFilterType(type);
		if (type === 'ALL') setDisplayedTransactionList(padArray(props.transactions, props.transactions.length > 5 ? 5 : props.transactions.length, null));
		else {
			const filteredTransaction = props.transactions.filter((item) => {return item.status === type});
			if (filteredTransaction.length < 1) setDisplayedTransactionList([]);
			else setDisplayedTransactionList(padArray(filteredTransaction, props.transactions.length > 5 ? 5 : props.transactions.length, null));
		}
	};

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
					onPress={() => {filterData('ALL')}}
					style={[styles.filterButton, filterType === 'ALL' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'ALL' ? styles.filterTextActive : {}]}>{props.contentText['ALL_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('APPROVED')}}
					style={[styles.filterButton, filterType === 'APPROVED' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'APPROVED' ? styles.filterTextActive : {}]}>{props.contentText['APPROVED_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('ON_PROGRESS')}}
					style={[styles.filterButton, filterType === 'ON_PROGRESS' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'ON_PROGRESS' ? styles.filterTextActive : {}]}>{props.contentText['ON_PROGRESS_TRANSACTIONS']}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					accessibilityRole={'button'}
					onPress={() => {filterData('REJECTED')}}
					style={[styles.filterButton, filterType === 'REJECTED' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'REJECTED' ? styles.filterTextActive : {}]}>{props.contentText['REJECTED_TRANSACTIONS']}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.transactionListContainer}>
				<Text style={displayedTransactionList.length ? styles.hidden : styles.noRecentTransaction}>{props.contentText['NO_RECENT_TRANSACTION']}</Text>
				{displayedTransactionList.slice(0, 5).map((item, index) => {
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