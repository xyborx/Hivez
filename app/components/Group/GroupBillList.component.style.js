import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	billDate: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	billDescriptionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between'
	},
	billDetailContainer: {
		flexDirection: 'row'
	},
	billDetailIcon: {
		color: theme.COLOR_GREY,
		marginLeft: theme.MARGIN_NARROW
	},
	billDetail: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	billItem: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_NARROW,
		paddingVertical: theme.PADDING_EXTRA_NARROW
	},
	billName: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	billOverviewContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between',
		paddingVertical: theme.PADDING_DEFAULT
	},
	billOverviewText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	billTitleContainer: {
		flex: 1
	},
	billValue: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	billValueContainer: {
		alignItems: 'center',
		flexDirection: 'row'
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
	expense: {
		color: theme.COLOR_RED,
	},
	groupImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 120,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 120
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
		fontSize: theme.FONT_SIZE_SUB_HEADER
	},
	hidden: {
		display: 'none'
	},
	income: {
		color: theme.COLOR_GREEN,
	},
	marginTop: {
		marginTop: theme.MARGIN_NARROW
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
	sectionContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		paddingBottom: theme.PADDING_DEFAULT
	},
	sectionContainerWithPadding: {
		padding: theme.PADDING_DEFAULT
	},
	searchField: {
		margin: theme.MARGIN_DEFAULT
	},
	switch: {
		marginHorizontal: theme.MARGIN_WIDE
	}
});