import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDefault, buttonDisabled, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	contentContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	default: {
		...buttonDefault
	},
	disabled: {
		...buttonDisabled
	},
	icon: {
		color: theme.COLOR_WHITE,
		marginRight: theme.MARGIN_NARROW
	},
	iconDisabled: {
		color: theme.COLOR_SOFT_GREY
	},
	text: {
		...textHighlight,
		color: theme.COLOR_WHITE
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	}
});