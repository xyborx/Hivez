import React from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconButton from '../Button/IconButton.component';
import styles from './ItemCard.component.style';

const ItemCard = (props) => {
	return (
		<View style={styles.itemCard}> 
			<View style={styles.itemContainer}>
				<TouchableHighlight
					activeOpacity={0.8}
					style={styles.itemDataButton}
					underlayColor={'#FFC60B'}
					onPress={() => props.itemData.onClick(props.itemData.id)}>
					<View style={styles.itemDataContainer}>
						<Image
							source={props.itemData.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.itemData.image}`}}
							style={styles.itemImage} />
						<View style={styles.itemDetails}>
							<View style={{flexDirection: 'column'}}>
								<Text style={styles.itemName}>{props.itemData.name}</Text>
								<Text style={styles.itemDescription}>{props.itemData.description}</Text>
							</View>
						</View>
					</View>
				</TouchableHighlight>
				<TouchableOpacity
					style={props.expandable ? styles.expandButton : styles.hidden}
					onPress={() => {props.setDisplayDetails(!props.displayDetails)}}>
					<View style={styles.expandWrapper}>
						<FontAwesome5 name={props.displayDetails ? 'angle-up' : 'angle-down'} style={styles.expandIcon}/>
					</View>
				</TouchableOpacity>
			</View>
			<View style={props.displayDetails ? styles.actionContainer : styles.hidden}>
				{props.itemData.action.map((item, index) => {
					return(
						<IconButton
							icon={item.icon}
							key={index}
							onPress={() => item.action(props.itemData.id)}
							style={styles.iconButton}
							text={props.contentText[item.name]} />
					);
				})}
			</View>
		</View>
	);
};

export default ItemCard;