import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ButtonWithConfirmation from '../Button/ButtonWithConfirmation.component';
import FloatingBackButton from '../Button/FloatingBackButton.component';
import NumberField from '../TextField/NumberField.component';
import TextField from '../TextField/TextField.component';
import styles from './CreateGroupBill.component.style';

const CreateGroupBill = (props) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<FloatingBackButton action={props.goBack} backText={props.contentText['BACK']} />
				<View style={styles.pageContentView}>
					<Text style={styles.header}>{props.contentText['PAGE_TITLE']}</Text>
					<Image
						source={props.groupDetail.image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${props.groupDetail.image}`}}
						style={styles.groupImage}/>
					<Text style={styles.groupName}>{props.groupDetail.name}</Text>
					<View style={styles.createTransactionContainer}>
						<NumberField
							onChangeText={props.setValue}
							style={styles.numberField}
							textStyle={styles.income}
							value={props.value} />
						<TextField
							contentText={props.descriptionText}
							customValidateInput={props.validateDescription}
							onChangeText={props.setDescription}
							placeholder={props.contentText['DESCRIPTION_PLACEHOLDER']}
							style={styles.textField}
							textIcon={'sticky-note'}
							validateInput={true}
							value={props.description} />
						<ButtonWithConfirmation
							accessability={props.nextButtonAccessbility}
							confirmText={props.confirmCreateText}
							onPress={props.createGroupTransaction}
							style={styles.button}
							text={props.contentText['CREATE_BILL']} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default CreateGroupBill;