import React from 'react';
import {Text, ScrollView, View, RefreshControl} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingActionButton from '../Button/FloatingActionButton.component';
import ItemList from '../ItemList/ItemList.component';
import SearchField from '../TextField/SearchField.component';
import styles from './GroupList.component.style';

const GroupList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView
				ref={props.scrollRef}
				refreshControl={<RefreshControl refreshing={false} onRefresh={props.onRefresh} />}
				keyboardShouldPersistTaps={'handled'}
				showsVerticalScrollIndicator={false}
				style={styles.pageContainer}
				contentContainerStyle={styles.pageContentView}>
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<View style={styles.groupListContainer}>
						<SearchField
							onChangeText={props.onChangeSearch}
							placeholder={props.contentText['SEARCH_PLACEHOLDER']}
							style={styles.searchField}
							value={props.searchValue} />
						<ItemList
							dataList={props.groupList}
							emptyText={props.searchValue === '' ? props.contentText['EMPTY_GROUP'] : props.contentText['EMPTY_SEARCH_RESULT']}
							onItemClick={props.onGroupClick} />
					</View>
				</View>
			</ScrollView>
			<FloatingActionButton
				buttonIcon={'plus'}
				buttonIconOnFocus={'times'}
				leftButtonIcon={'search'}
				leftButtonAction={props.findGroup}
				topButtonIcon={'user-plus'}
				topButtonAction={props.createGroup} />
		</SafeAreaView>
	);
}

export default GroupList;