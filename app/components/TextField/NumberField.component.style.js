import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {inputText, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	container: {
		...inputText,
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderWidth: 0,
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 'auto',
		justifyContent: 'center',
		textAlign: 'right',
		padding: 0,
		margin: 0
	},
	hidden: {
		display: 'none'
	},
	currencyContainer: {
		borderRadius: theme.ROUNDNESS_MINIMUM,
		marginRight: theme.MARGIN_NARROW
	},
	currencyText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	textInput: {
		flex: 1,
		flexGrow: 1,
		fontSize: theme.FONT_SIZE_HEADER,
		textAlign: 'right',
		paddingRight: 0
	}
});