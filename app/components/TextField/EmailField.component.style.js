import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {iconInline, inputText, inputTextDisabled, inputTextInvalid, textError, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	containerDisabled: {
		...inputTextDisabled,
		...textHighlight,
		marginBottom: theme.MARGIN_NARROW
	},
	errorMessage: {
		...textError,
		marginTop: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	},
	inputTextDisabled: {
		...textHighlight
	},
	inputText: {
		...inputText
	},
	inputTextInvalid: {
		...inputTextInvalid	
	},
	textInput: {
		flex: 1,
		flexGrow: 1
	},
	toggleButton: {
		alignItems: 'center',
		flexBasis: 20,
		justifyContent: 'center',
		margin: 2,
		textAlign: 'center'
	},
	toggleIcon: {
		...iconInline
	}
});