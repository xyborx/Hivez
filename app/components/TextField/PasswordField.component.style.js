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
	errorMessage: {
		...textError,
		marginTop: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
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
		flexBasis: 24,
		justifyContent: 'center',
		margin: 2,
		textAlign: 'center'
	},
	toggleIcon: {
		...iconInline
	}
});