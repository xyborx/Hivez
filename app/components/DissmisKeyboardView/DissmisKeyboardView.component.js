import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const DismissKeyboardView = ({ children }) => (
	<TouchableWithoutFeedback
	style={{flex: 1}}
	onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

export default DismissKeyboardView;