import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingButton from '../Button/FloatingButton.component';
import ItemList from '../ItemList/ItemList.component';
import SearchField from '../TextField/SearchField.component';
import styles from './EventList.component.style';

const EventList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} horizontal={true} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<View style={styles.eventListContainer}>
						<SearchField
							onChangeText={props.onChangeSearch}
							placeholder={props.contentText['SEARCH_PLACEHOLDER']}
							style={styles.searchField}
							value={props.searchValue} />
						<ItemList
							dataList={props.eventList}
							emptyText={props.searchValue === '' ? props.contentText['EMPTY_EVENT'] : props.contentText['EMPTY_SEARCH_RESULT']}
							onItemClick={props.onEventClick} />
					</View>
				</View>
			</ScrollView>
			<FloatingButton
				buttonIcon={'plus'}
				leftButtonIcon={'search'}
				leftButtonAction={props.findEvent}
				topButtonIcon={'user-plus'}
				topButtonAction={props.createEvent} />
		</SafeAreaView>
	);
}

export default EventList;