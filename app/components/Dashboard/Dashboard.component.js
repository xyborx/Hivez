import React from 'react';
import {Text, TouchableOpacity, ScrollView, View, RefreshControl} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FavouriteItem from '../FavouriteItem/FavouriteItem.component';
import PendingApprovalCard from '../PendingApprovalCard/PendingApprovalCard.component';
import RecentTransaction from '../RecentTransaction/RecentTransaction.component';
import styles from './Dashboard.component.style';

const Dashboard = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView
				refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
				ref={props.scrollRef}
				keyboardShouldPersistTaps={'handled'}
				showsVerticalScrollIndicator={false}
				style={styles.pageContainer}
				contentContainerStyle={styles.pageContentView}>
				<View style={styles.scrollViewWrapper}>
					<View style={styles.indentSection}>
						<Text style={styles.header}>
							{props.contentText['HEADER'].replace('{user_name}', props.userName)}
						</Text>
						<Text style={styles.subHeader}>
							{props.contentText['SUB_HEADER']}
						</Text>
						<View style={styles.favouriteGroupWrapper}>
							<Text style={styles.textHighlight}>
								{props.contentText['YOUR_FAVOURITE_GROUPS']}
							</Text>
							<TouchableOpacity accessibilityRole={'button'} style={styles.editListButton}>
								<Text style={styles.textHighlight}>
									{props.contentText['EDIT_LIST']}
								</Text>
								<FontAwesome5 name={'angle-right'} style={styles.editIcon} />
							</TouchableOpacity>
						</View>
					</View>
					<FavouriteItem
						contentText={props.contentText}
						itemList={props.favouriteItemList}
						style={styles.favouriteGroup} />
					<PendingApprovalCard
						contentText={props.contentText}
						pendingApprovalList={props.pendingApprovalList}
						style={props.pendingApprovalList.length === 0 ? styles.hidden : styles.groupApprovalCard} />
					<RecentTransaction
						contentText={props.recentTransactionText}
						filterTransaction={props.filterTransaction}
						onEventRequestDetailClick={props.onEventRequestDetailClick}
						onGroupBillDetailClick={props.onGroupBillDetailClick}
						onGroupRequestDetailClick={props.onGroupRequestDetailClick}
						style={styles.recentTransaction}
						transactionList={props.transactionList} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Dashboard;