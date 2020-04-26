import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
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
		marginTop: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	}
});