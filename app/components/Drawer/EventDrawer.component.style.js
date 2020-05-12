import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
	button: {
		padding: theme.PADDING_DEFAULT
	},
	buttonFocused: {
		backgroundColor: theme.COLOR_PRIMARY
	},
	buttonContainer: {
		flexDirection: 'row'
	},
	buttonIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		marginRight: theme.MARGIN_DEFAULT,
		textAlign: 'center',
		width: 40
	},
	buttonIconFocused: {
		color: theme.COLOR_WHITE
	},
	buttonText: {
		color: theme.COLOR_SOFT_GREY,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	buttonTextFocused: {
		color: theme.COLOR_WHITE
	},
	eventImage: {
		alignSelf: 'center',
		borderRadius: 80/ 2,
		height: 80,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 80
	},
	headerContainer: {
		backgroundColor: theme.COLOR_PRIMARY,
		padding: theme.PADDING_WIDE
	},
	header: {
		color: theme.COLOR_WHITE,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center'
	},
	subHeader: {
		color: theme.COLOR_WHITE,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontStyle: 'italic',
		marginTop: theme.MARGIN_EXTRA_NARROW,
		textAlign: 'center'
	},
	leave: {
		color: theme.COLOR_RED
	}
});