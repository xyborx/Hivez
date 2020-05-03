import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
	floatingButtonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: theme.MARGIN_WIDE,
		left: theme.MARGIN_WIDE,
		backgroundColor: 'transparent',
		zIndex: 1
	},
	floatingButtonIcon: {
		color: theme.COLOR_PRIMARY,
		fontSize: theme.FONT_SIZE_SUB_HEADER
	},
	hidden: {
		display: 'none'
	}
});