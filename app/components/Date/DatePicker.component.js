import React, {useState} from 'react';
import {Platform, Text, TouchableHighlight, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {currentDate, dateToString} from '../../utils/date.utils';
import styles from './DatePicker.component.style';

const DatePicker = (props) => {
	const [date, setDate] = useState(new Date(currentDate));
	const [show, setShow] = useState(false);

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		props.onChange(currentDate);
	};

	return (
		<View style={props.style}>
			{show && <DateTimePicker
				display="default"
				mode={'date'}
				is24Hour={true}
				maximumDate={new Date(currentDate)}
				onChange={onChangeDate}
				testID="datePicker"
				value={date} />}
			<TouchableHighlight
				activeOpacity={1}
				onPress={() => setShow(true)}
				style={styles.default}
				underlayColor={'rgba(0,0,0,0.075)'}>
				<View style={styles.container}>
					<View style={styles.iconContainer}>
						<FontAwesome5 name={'calendar'} style={styles.inputIcon} />
					</View>
					<Text style={styles.text}>{dateToString(date)}</Text>
				</View>
			</TouchableHighlight>
		</View>
	); 
}

export default DatePicker;