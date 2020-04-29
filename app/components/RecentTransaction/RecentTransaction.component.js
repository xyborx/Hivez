import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './RecentTransaction.component.style';

const RecentTransaction = (props) => {
	const [filterType, setFilterType] = useState('All');
	const [transactionList, setTransactionList] = useState(props.transactionList);

	const filterData = (type) => {
		setFilterType(type);
		if(type === 'All') setTransactionList(props.transactionList)
		else setTransactionList(props.transactionList.filter((item) => {return item.transactionStatus === type}))
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerSecion}>
				<View style={styles.headerTextContainer}>
					<Text style={styles.headerText}>{props.contentText['RECENT_TRANSACTIONS']}</Text>
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
				{transactionList.map(({transactionID, transactionName, transactionGroupName, transactionType, transactionValue, transactionStatus, groupImage }, index) => {
					return (
						<View key={transactionID}>
							<TouchableOpacity accessibilityRole={'button'} style={styles.transactionItem}> 
								<Image
									source={groupImage === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${groupImage}`}}
									style={styles.transactionImage}/>
								<View style={styles.transactionDescriptionContainer}>
									<View style={styles.transactionTitleContainer}>
										<Text style={styles.transactionName}>{transactionName}</Text>
										<Text style={styles.transactionGroupName}>
											{`${transactionGroupName} - ${props.contentText[`${transactionStatus.toUpperCase().replace(' ', '_')}_TRANSACTIONS`]}`}
											</Text>
									</View>
									<View style={styles.transactionValueContainer}>
										<Text style={[transactionType === 'Credit' ? styles.credit : styles.debit, styles.transactionValue]}>{`Rp ${transactionValue}`}</Text>
										<FontAwesome5 name={'angle-right'} style={styles.transactionDetailIcon} />
									</View>
								</View>
							</TouchableOpacity>
							<View style={index == transactionList.length -1 ? styles.hidden : styles.separator}/>
						</View>
					);
				})}
			</View>
		</View>
	);
}

export default RecentTransaction;