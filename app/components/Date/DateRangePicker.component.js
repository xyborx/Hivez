import React, {useState} from 'react';
import {Platform, Text, TouchableHighlight, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {currentDate, dateToString} from '../../utils/date.utils';
import styles from './DateRangePicker.component.style';

const DateRangePicker = (props) => {
	const [showStartDate, setShowStartDate] = useState(false);
	const [showEndDate, setShowEndDate] = useState(false);

	const onChangeStartDate = (event, selectedDate) => {
		const currentDate = selectedDate || new Date(props.startDateValue);
		setShowStartDate(Platform.OS === 'ios');
		props.onChangeStartDate(currentDate);
	};

	const onChangeEndDate = (event, selectedDate) => {
		const currentDate = selectedDate || new Date(props.endDateValue);
		setShowEndDate(Platform.OS === 'ios');
		props.onChangeEndDate(currentDate);
	};

	return (
		<View style={props.style}>
			{showStartDate && <DateTimePicker
				display="default"
				mode={'date'}
				is24Hour={true}
				maximumDate={new Date(props.endDateValue)}
				onChange={onChangeStartDate}
				testID="datePicker"
				value={new Date(props.startDateValue)} />}
			{showEndDate && <DateTimePicker
				display="default"
				mode={'date'}
				is24Hour={true}
				minimumDate={new Date(props.startDateValue)}
				maximumDate={new Date(currentDate)}
				onChange={onChangeEndDate}
				testID="datePicker"
				value={new Date(props.endDateValue)} />}
			<View style={styles.default}>
				<TouchableHighlight
					activeOpacity={1}
					onPress={() => setShowStartDate(true)}
					style={styles.container}
					underlayColor={'rgba(0,0,0,0.075)'}>
					<Text style={styles.text}>{dateToString(props.startDateValue, props.shortDate)}</Text>
				</TouchableHighlight>
				<View style={styles.iconContainer}>
					<FontAwesome5 name={'long-arrow-alt-right'} style={styles.inputIcon} />
				</View>
				<TouchableHighlight
					activeOpacity={1}
					onPress={() => setShowEndDate(true)}
					style={styles.container}
					underlayColor={'rgba(0,0,0,0.075)'}>
					<Text style={styles.text}>{dateToString(props.endDateValue, props.shortDate)}</Text>
				</TouchableHighlight>
			</View>
		</View>
	); 
};

export default DateRangePicker;