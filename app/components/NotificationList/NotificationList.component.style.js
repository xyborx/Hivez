import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	emptyList: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	emptyListText: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_SOFT_GREY
	},
	flatList: {
		overflow: 'hidden'
	},
	header: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_LARGE,
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginVertical: theme.MARGIN_NARROW
	},
	headerContainer: {
		backgroundColor: theme.COLOR_WHITE
	},
	hidden: {
		display: 'none'
	},
	listDate: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	listDetail: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_TINY
	},
	listDetailContainer: {
		flex: 1,
		flexGrow: 1,
		flexWrap: 'wrap',
		alignItems: 'flex-start'
	},
	listIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		paddingLeft: theme.PADDING_NARROW
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
	},
	listTitle: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	sectionList: {
		flexGrow: 1
	}
});