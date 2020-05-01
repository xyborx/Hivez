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
	groupDetail: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		flexGrow: 1
	},
	groupDetailIcon: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	groupImage: {
		borderRadius: 48/2,
		height: 48,
		marginRight: theme.MARGIN_DEFAULT,
		width: 48
	},
	groupItem: {
		alignItems:'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_WIDE,
		paddingVertical: theme.PADDING_NARROW
	}
});