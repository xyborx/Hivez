import React, {useState} from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {padArray, rupiahFormatting} from '../../utils/helper.utils';
import {getRelativeDate} from '../../utils/date.utils';
import styles from './RecentTransaction.component.style';

const TransactionItem = (props) => {
	const {id, name, date, sourceName, sourceType, type, value, status, image} = props.item;
	return (
		<TouchableHighlight
			accessibilityRole={'button'}
			activeOpacity={1}
			underlayColor={'rgba(0,0,0,0.05)'}
			onPress={() => props.onItemClick(id)}
			style={styles.transactionItem}>
			<View style={styles.transactionItem}>
				<Image
					source={image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
					style={styles.transactionImage}/>
				<View style={styles.transactionDescriptionContainer}>
					<View style={styles.transactionTitleContainer}>
						<Text style={styles.transactionName}>{name}</Text>
						<Text style={styles.transactionGroupName}>
							{`${sourceName} - ${props.contentText[`${status}_TRANSACTIONS`]}`}
						</Text>
						<Text style={styles.transactionDate}>{getRelativeDate(date)}</Text>
					</View>
					<View style={styles.transactionValueContainer}>
						<Text style={[styles.transactionValue, type === 'INCOME' ? styles.income : styles.expense]}>{rupiahFormatting(value)}</Text>
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
				<Image style={styles.transactionImage}/>
				<View style={styles.transactionDescriptionContainer}>
					<View style={styles.transactionTitleContainer}>
						<Text style={styles.transactionName}></Text>
						<Text style={styles.transactionGroupName}></Text>
					</View>
					<View style={styles.transactionValueContainer}>
						<Text style={styles.transactionValue}></Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
}

const RecentTransaction = (props) => {
	const [filterType, setFilterType] = useState('ALL');
	const [transactionList, setTransactionList] = useState(padArray(props.transactionList, 5, null));

	const filterData = (type) => {
		setFilterType(type);
		if (type === 'ALL') setTransactionList(padArray(props.transactionList, 5, null));
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
					onPress={() => {filterData('DECLINED')}}
					style={[styles.filterButton, filterType === 'DECLINED' ? styles.filterButtonActive : {}]}>
					<Text style={[styles.filterText, filterType === 'DECLINED' ? styles.filterTextActive : {}]}>{props.contentText['DECLINED_TRANSACTIONS']}</Text>
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
							onItemClick={
								item.sourceType === 'GROUP_REQUEST' ? props.onGroupRequestDetailClick :
								item.sourceType === 'GROUP_BILL' ? props.onGroupBillDetailClick :
								props.onEventRequestDetailClick
							} />
					);
				})}
			</View>
		</View>
	);
}

export default RecentTransaction;