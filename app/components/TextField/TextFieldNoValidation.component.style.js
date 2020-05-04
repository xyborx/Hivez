import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {iconInline, inputText} from '../../styles/common.style';

export default StyleSheet.create({
	container: {
		...inputText,
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
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
	textInput: {
		flex: 1,
		flexGrow: 1
	}
});