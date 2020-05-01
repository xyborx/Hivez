import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './SearchField.component.style';

const SearchField = (props) => {
	return (
		<View style={[styles.container, props.style]}>
			<FontAwesome5 name={'search'} style={styles.searchIcon} />
			<TextInput
				autoCapitalize={'words'}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder}
				style={styles.textInput}
				value={props.value} 
				/>
			<TouchableOpacity
				onPress={() => props.onChangeText('')}
				style={props.value.length > 0 ? styles.clearButton : styles.hidden}>
				<FontAwesome5 name={'times'} style={styles.clearIcon} />
			</TouchableOpacity>
		</View>
	);
}

export default SearchField;