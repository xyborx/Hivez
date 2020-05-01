import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
	floatingButtonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: theme.MARGIN_WIDE,
		right: theme.MARGIN_WIDE,
		height: 60,
		width: 60,
		borderRadius: 60/2,
		backgroundColor: theme.COLOR_PRIMARY
	},
	floatingButtonLeftChild: {
		bottom: theme.MARGIN_DEFAULT,
		right: theme.MARGIN_WIDE + 40 + theme.MARGIN_DEFAULT
	},
	floatingButtonTopChild: {
		bottom: theme.MARGIN_WIDE + 40 + theme.MARGIN_DEFAULT,
		right: theme.MARGIN_DEFAULT
	},
	floatingButtonFocused: {
		height: 40,
		width: 40,
		borderRadius: 40/2,
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