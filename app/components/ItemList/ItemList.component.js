import React from 'react';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './ItemList.component.style';

const ItemList = (props) => {
	return (
		<FlatList
			data={props.dataList}
			keyboardShouldPersistTaps={'handled'}
			keyExtractor={item => item.groupID}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.flatList}
			renderItem={({item}) => (
				<View key={item.groupID}>
					<TouchableHighlight
						accessibilityRole={'button'}
						activeOpacity={1}
						underlayColor={'rgba(0,0,0,0.05)'}
						onPress={() => {props.onItemClick(item.groupID)}}
						style={styles.groupItemButton} >
						<View style={styles.groupItem}>
							<Image
								source={item.groupImage === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${item.groupImage}`}}
								style={styles.groupImage}/>
							<Text style={styles.groupDetail}>{`${item.groupName} (${item.groupMemberCount})`}</Text>
							<FontAwesome5 name={'angle-right'} style={styles.groupDetailIcon} />
						</View>
					</TouchableHighlight>
				</View>
			)}
			ListEmptyComponent={
				<View style={styles.emptyList}>
					<Text style={styles.emptyListText}>{props.emptyText}</Text>
				</View>} />
	);
}

export default ItemList;