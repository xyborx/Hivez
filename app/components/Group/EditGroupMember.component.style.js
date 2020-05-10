import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		marginTop: theme.MARGIN_NARROW
	},
	dateField: {
		marginTop: theme.MARGIN_DEFAULT
	},
	dateDetails: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	groupImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_WIDE,
		width: 160
	},
	groupName: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center',
		marginBottom: theme.MARGIN_WIDE
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	headerText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_NARROW
	},
	hidden: {
		display: 'none'
	},
	memberActionIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		textAlign: 'center'
	},
	memberActionItem: {
		marginLeft: theme.MARGIN_NARROW
	},
	memberActionContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	memberDetailContainer: {
		flex: 1
	},
	memberImage: {
		borderRadius: 48/2,
		flexGrow: 0,
		height: 48,
		marginRight: theme.MARGIN_DEFAULT,
		width: 48
	},
	memberItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_DEFAULT,
		paddingVertical: theme.PADDING_NARROW
	},
	memberRole: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	memberTextDetailWithMargin: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	rootContainer: {
		...rootContainer
	},
	searchField: {
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_DEFAULT
	},
	sectionContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		paddingVertical: theme.PADDING_DEFAULT
	},
	sectionContainerWithPadding: {
		padding: theme.PADDING_DEFAULT
	}
});