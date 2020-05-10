import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import FindItemList from '../ItemList/FindItemList.component';
import SearchField from '../TextField/SearchField.component';
import styles from './FindGroup.component.style';

const FindGroup = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<View style={styles.groupListContainer}>
						<SearchField
							onChangeText={props.onChangeSearch}
							placeholder={props.contentText['SEARCH_PLACEHOLDER']}
							style={styles.searchField}
							value={props.searchValue} />
						<FindItemList
							contentText={props.contentText}
							confirmJoinText={props.confirmJoinText}
							dataList={props.groupList}
							emptyText={props.searchValue === '' ? props.contentText['DEFAULT_TEXT'] : props.contentText['EMPTY_SEARCH_RESULT']}
							onItemClick={props.requestJoinGroup} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default FindGroup;