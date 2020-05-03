import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		flex: 1,
		height: theme.HEIGHT_DEFAULT,
		justifyContent: 'center'
	},
	buttonContainer: {
		backgroundColor: theme.COLOR_PRIMARY,
		flexDirection: 'row',
		borderTopWidth: 2,
		borderTopColor: 'rgba(0,0,0,0.025)'
	},
	hidden: {
		display: 'none'
	},
	icon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		height: 20,
		textAlign: 'center'
	},
	iconFocus: {
		color: theme.COLOR_WHITE,
	},
	text: {
		...textHighlight,
		color: theme.COLOR_WHITE
	}
});