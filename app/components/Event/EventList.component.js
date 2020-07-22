import React from 'react';
import {Text, ScrollView, View, RefreshControl} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingActionButton from '../Button/FloatingActionButton.component';
import ItemList from '../ItemList/ItemList.component';
import SearchField from '../TextField/SearchField.component';
import styles from './EventList.component.style';

const EventList = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView
				contentContainerStyle={styles.pageContentView}
				ref={props.scrollRef} keyboardShouldPersistTaps={'handled'}
				refreshControl={<RefreshControl refreshing={false} onRefresh={props.onRefresh} />}
				showsVerticalScrollIndicator={false}
				style={styles.pageContainer}>
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
			<FloatingActionButton
				buttonIcon={'plus'}
				buttonIconOnFocus={'times'}
				leftButtonIcon={'search'}
				leftButtonAction={props.findEvent}
				topButtonIcon={'user-plus'}
				topButtonAction={props.createEvent} />
		</SafeAreaView>
	);
}

export default EventList;