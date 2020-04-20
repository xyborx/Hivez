import React, {Component} from 'react';
import {TextInput} from 'react-native';
import styles from './PasswordField.component.style';

class PasswordField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(`PasswordField props: ${this.props}`);
		const {onChangeText, placeholder, style, value} = this.props;
		return (
            <TextInput
			onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.default, style]}
            value={value}
            secureTextEntry={this.props.isHidden}
			/>
		);
	}
}

export default PasswordField;