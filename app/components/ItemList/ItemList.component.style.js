import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	flatList: {
		flexGrow: 1
	},
	emptyList: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	emptyListText: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_SOFT_GREY
	},
	listDetail: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		flexGrow: 1
	},
	listDetailIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM
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