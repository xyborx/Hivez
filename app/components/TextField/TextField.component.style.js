import {StyleSheet} from 'react-native';
import {inputText, inputTextInvalid, textError} from '../../styles/common.style';

export default StyleSheet.create({
	container: {
		...inputText
	},
	containerInvalid: {
		...inputTextInvalid	
	},
	errorMessage: {
		...textError,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	}
});