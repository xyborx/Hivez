import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	floatingButtonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: theme.MARGIN_WIDE,
		right: theme.MARGIN_WIDE,
		backgroundColor: theme.COLOR_LIGHT_GREY,
		zIndex: 1
	},
	floatingActionText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_LARGE
	},
	hidden: {
		display: 'none'
	}
});