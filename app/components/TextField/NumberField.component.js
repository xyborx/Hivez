import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {rupiahFormatting} from '../../utils/helper.utils';
import styles from './NumberField.component.style';

const NumberField = (props) => {
	const [displayValue, setDisplayValue] = useState(props.value == 0 ? '' : rupiahFormatting(props.value, false));
	const [realValue, setRealValue] = useState(props.value.toString());

	const onChangeValue = (value) => {
		const formattedValue = value.replace(/\s/g, '').replace(/\./g, '');
		if (formattedValue === '' || /^\d+$/.test(formattedValue)) {
			props.onChangeText(formattedValue);
			setRealValue(formattedValue);
			setDisplayValue(formattedValue);
		}
	};

	const onFocusField = () => {
		setDisplayValue(realValue);
	};

	const onBlurField = () => {
		setDisplayValue(rupiahFormatting(realValue, false));
	};

	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.currencyContainer}>
				<Text style={styles.currencyText}>{'IDR'}</Text>
			</View>
			<TextInput
				editable={props.editable}
				keyboardType={'numeric'}
				onBlur={onBlurField}
				onChangeText={onChangeValue}
				onFocus={onFocusField}
				placeholder={'0'}
				style={[styles.textInput, props.textStyle]}
				value={displayValue} />
		</View>
	);
}

export default NumberField;