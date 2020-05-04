import React, { useState} from 'react';
import {Modal, Image, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import styles from './PreviewPicture.component.style';

const PreviewPicture = (props) => {
	const [visibility, setVisibility] = useState(false);
	const toggleModal = () => {setVisibility(!visibility)};
	return (
		<View style={styles.boxContainer}>
			{props.touchableType === 'highlight' ? (
				<TouchableHighlight
					activeOpacity={1}
					onPress={toggleModal}
					style={props.style}
					underlayColor={'rgba(0,0,0,0.05)'}>
					{props.children}
				</TouchableHighlight>
			) : (
				<TouchableOpacity
					style={props.style}
					onPress={toggleModal}>
					{props.children}
				</TouchableOpacity>
			)}
			<Modal
				animationType={'slide'}
				onRequestClose={toggleModal}
				transparent={true}
				visible={visibility}>
					<FloatingBackButton action={toggleModal} backText={props.closeText} />
				<SafeAreaView style={styles.rootContainer}>
					<Image resizeMode={'contain'} source={{uri: `data:image/jpeg;base64,${props.image}`}} style={styles.image} />
				</SafeAreaView>
			</Modal>
		</View>
	);
}

export default PreviewPicture;