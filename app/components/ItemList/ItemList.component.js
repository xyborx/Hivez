import React from 'react';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './ItemList.component.style';

const ItemList = (props) => {
	return (
		<FlatList
			data={props.dataList}
			keyboardShouldPersistTaps={'handled'}
			keyExtractor={item => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.flatList}
			renderItem={({item}) => (
				<View key={item.id}>
					<TouchableHighlight
						accessibilityRole={'button'}
						activeOpacity={1}
						underlayColor={'rgba(0,0,0,0.05)'}
						onPress={() => {props.onItemClick(item.id)}}
						style={styles.listItemButton} >
						<View style={styles.listItem}>
							<Image
								source={item.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${item.image}`}}
								style={styles.listImage}/>
							<Text style={styles.listDetail}>{`${item.name} (${item.memberCount})`}</Text>
							<FontAwesome5 name={'angle-right'} style={styles.listDetailIcon} />
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