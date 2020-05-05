import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, textHighlight, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	emptyList: {
		...boxShadow,
		alignItems: 'center',
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		justifyContent: 'center',
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		padding: theme.PADDING_WIDE
	},
	emptyListText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_GREY
	},
	flatList: {
		overflow: 'hidden'
	},
	header: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginVertical: theme.MARGIN_NARROW
	},
	headerContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		overflow: 'hidden',
		paddingTop: theme.PADDING_NARROW,
		paddingBottom: theme.PADDING_DEFAULT
	},
	hidden: {
		display: 'none'
	},
	listDate: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	listDetail: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
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