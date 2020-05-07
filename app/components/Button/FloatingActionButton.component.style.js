import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow} from '../../styles/common.style';

export default StyleSheet.create({
	floatingButtonContainer: {
		...boxShadow,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: theme.MARGIN_NARROW,
		right: theme.MARGIN_NARROW,
		height: theme.ACTION_BUTTON_SIZE,
		width: theme.ACTION_BUTTON_SIZE,
		borderRadius: theme.ACTION_BUTTON_SIZE/2,
		backgroundColor: theme.COLOR_PRIMARY
	},
	floatingButtonLeftChild: {
		bottom: theme.MARGIN_NARROW,
		right: theme.MARGIN_NARROW + theme.ACTION_BUTTON_ON_FOCUS_SIZE + theme.MARGIN_NARROW
	},
	floatingButtonTopChild: {
		bottom: theme.MARGIN_NARROW + theme.ACTION_BUTTON_ON_FOCUS_SIZE + theme.MARGIN_NARROW,
		right: theme.MARGIN_NARROW
	},
	floatingButtonFocused: {
		height: theme.ACTION_BUTTON_ON_FOCUS_SIZE,
		width: theme.ACTION_BUTTON_ON_FOCUS_SIZE,
		borderRadius: theme.ACTION_BUTTON_ON_FOCUS_SIZE/2,
	},
	floatingButtonFocusedIcon: {
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	floatingButtonIcon: {
		color: theme.COLOR_WHITE,
		fontSize: theme.FONT_SIZE_LARGE
	},
	hidden: {
		display: 'none'
	}
});