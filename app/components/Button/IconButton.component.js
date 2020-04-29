import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './IconButton.component.style';

const IconButton = (props) => {
	return (
		<TouchableOpacity accessibilityRole={'button'} style={props.style} onPress={props.onPress} >
			<Image
				source={
					props.icon === 'request' ? require('../../assets/icons/request.png') :
					props.icon === 'payBill' ? require('../../assets/icons/payBill.png') :
					props.icon === 'viewReport' ? require('../../assets/icons/viewReport.png') :
					require('../../assets/icons/viewReport.png')
				}
				style={styles.icon}/>
			<Text style={styles.text}>{props.text}</Text>
		</TouchableOpacity>
	); 
};

export default IconButton;