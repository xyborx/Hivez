import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingButton from '../Button/FloatingButton.component';
import ItemList from '../ItemList/ItemList.component';
import SearchField from '../TextField/SearchField.component';
import styles from './GroupList.component.style';

const GroupList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} horizontal={true} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
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
			<FloatingButton
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