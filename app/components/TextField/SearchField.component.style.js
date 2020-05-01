import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {inputText} from '../../styles/common.style';

export default StyleSheet.create({
	clearButton: {
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	clearIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		marginLeft: theme.MARGIN_NARROW
	},
	container: {
		...inputText,
		alignItems: 'center',
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: theme.PADDING_DEFAULT
	},
	hidden: {
		display: 'none'
	},
	searchIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		marginRight: theme.MARGIN_NARROW
	},
	textInput: {
		flex: 1,
		flexGrow: 1
	}
});