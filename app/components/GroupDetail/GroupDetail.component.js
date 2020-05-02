import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import RecentTransactionDetail from '../RecentTransaction/RecentTransactionDetail.component';
import FloatingBurgerButton from '../Button/FloatingBurgerButton.component';
import styles from './GroupDetail.component.style';

const GroupDetail = (props) => {
	const {id, image, name, description} = props.groupDetail;
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.pageContainer} contentContainerStyle={styles.pageContentView}>
				<View>
					<FloatingBurgerButton />
					<Image
						source={image === '' ? require('../../assets/images/DefaultGroupImage.png') : {uri: `data:image/jpeg;base64,${image}`}}
						style={styles.groupImage}/>
					<Text style={styles.groupName}>{name}</Text>
					<Text style={styles.groupDescription}>{description}</Text>
					<RecentTransactionDetail
						contentText={props.recentBillText}
						style={styles.transactionList}
						onItemClick={props.onBillClick}
						transactionList={props.billList} />
					<RecentTransactionDetail
						contentText={props.recentTransactionText}
						style={styles.transactionList}
						onItemClick={props.onTransactionClick}
						transactionList={props.transactionList} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default GroupDetail;