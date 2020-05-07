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
	dateTitle: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: theme.MARGIN_NARROW,
		marginHorizontal: theme.MARGIN_DEFAULT
	},
	dateTitleDay: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_HEADER
	},
	dateTitleWeekDay: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	dateTitleMonthYear: {
		color: theme.COLOR_LIGHT_BLACK,
		marginTop: theme.MARGIN_TINY
	},
	dailyValue: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_LARGE
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
	rowButton: {
		flex: 1
	},
	rowButtonLeft: {
		marginRight: theme.MARGIN_NARROW
	},
	rowButtonRight: {
		marginLeft: theme.MARGIN_NARROW
	},
	rowColumn: {
		flexDirection: 'row',
		marginTop: theme.MARGIN_DEFAULT
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
	}
});