import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	flatList: {
		flexGrow: 1
	},
	emptyList: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: theme.MARGIN_NARROW
	},
	emptyListText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_GREY
	},
	listActionContainer: {
		textAlign: 'center'
	},
	listActionIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		textAlign: 'center'
	},
	listActionText: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_SMALL,
		textAlign: 'center'
	},
	listDescription: {
		color: theme.COLOR_SOFT_GREY,
		fontStyle: 'italic'
	},
	listDescriptionContainer: {
		flexGrow: 1
	},
	listTitle: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	listImage: {
		borderRadius: 48/2,
		height: 48,
		marginRight: theme.MARGIN_DEFAULT,
		width: 48
	},
	listItem: {
		alignItems:'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_DEFAULT,
		paddingVertical: theme.PADDING_NARROW
	}
});