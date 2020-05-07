import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
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
	transactionDate: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	transactionDescriptionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between'
	},
	transactionDetailContainer: {
		flexDirection: 'row'
	},
	transactionDetailIcon: {
		color: theme.COLOR_GREY,
		marginLeft: theme.MARGIN_NARROW
	},
	transactionDetail: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	transactionItem: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_NARROW,
		paddingVertical: theme.PADDING_EXTRA_NARROW
	},
	transactionName: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	transactionOverviewContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between',
		paddingVertical: theme.PADDING_DEFAULT
	},
	transactionOverviewText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	transactionTitleContainer: {
		flex: 1
	},
	transactionValue: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	transactionValueContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	searchField: {
		margin: theme.MARGIN_DEFAULT
	},
	switch: {
		marginHorizontal: theme.MARGIN_WIDE
	}
});