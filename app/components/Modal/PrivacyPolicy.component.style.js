import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	customSection: {
		marginVertical: theme.MARGIN_NARROW
	},
	header: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	icon: {
		color: theme.COLOR_BLACK_OVERLAY,
		fontSize: theme.FONT_SIZE_EXTRA_SMALL,
		marginHorizontal: theme.MARGIN_NARROW
	},
	listText: {
		marginBottom: theme.MARGIN_NARROW
	},
	modalWrapper: {
		flex: 1,
	},
	section: {
		marginBottom: theme.MARGIN_WIDE
	},
	text: {
		textAlign: 'justify'
	},
	textWithIcon: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	}
});