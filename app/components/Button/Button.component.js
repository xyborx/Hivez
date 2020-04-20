import React, {Component} from 'react';
import {Text, TouchableHighlight} from 'react-native';
import styles from './Button.component.style';

class TextField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight style={[styles.default, this.props.style]} underlayColor="white">
				<Text style={styles.text}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
}

export default TextField;