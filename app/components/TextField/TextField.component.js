import React, {Component} from 'react';
import {TextInput} from 'react-native';
import styles from './TextField.component.style';

class TextField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(`TextField props: ${this.props}`);
		const {onChangeText, placeholder, style, value} = this.props;
		return (
            <TextInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.default, style]}
            value={value}
			/>
		);
	}
}

export default TextField;