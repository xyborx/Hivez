import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {iconInline, inputText, inputTextInvalid, textError} from '../../styles/common.style';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
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
	},
	iconContainer: {
		width: 18,
		marginRight: theme.MARGIN_NARROW
	},
	inputIcon: {
		...iconInline
	},
	inputText: {
		...inputText
	},
	textInput: {
		flex: 1,
		flexGrow: 1
	}
});