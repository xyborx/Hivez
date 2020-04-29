import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	allTransactionButton: {
		alignItems: 'flex-end',
		flexDirection: 'row'
	},
	allTransactionIcon: {
		marginLeft: theme.MARGIN_NARROW
	},
	allTransactionText: {
		...textHighlight
	},
	container: {
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		marginHorizontal: theme.MARGIN_WIDE,
		padding: theme.PADDING_DEFAULT
	},
	filterList: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: theme.MARGIN_DEFAULT
	},
	filterButton: {
		alignSelf: 'center',
		borderRadius: theme.ROUNDNESS_MINIMUM,
		backgroundColor: theme.COLOR_WHITE,
		borderColor: theme.COLOR_GREY,
		borderWidth: theme.BORDER_THIN,
		marginRight: theme.MARGIN_DEFAULT,
		padding: theme.PADDING_NARROW,
	},
	filterButtonActive: {
		backgroundColor: theme.COLOR_PRIMARY,
		borderColor: theme.COLOR_PRIMARY
	},
	filterText: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SMALL,
	},
	filterTextActive: {
		color: theme.COLOR_WHITE
	},
	headerSecion: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerTextContainer: {
		flexDirection: 'column'
	},
	headerText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER
	},
	hidden: {
		display: 'none'
	},
	noRecentTransaction: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		textAlign: 'center',
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
	transactionGroupName: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	transactionImage: {
		borderRadius: 40/2,
		flexGrow: 0,
		height: 40,
		marginRight: theme.MARGIN_DEFAULT,
		width: 40
	},
	transactionItem: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: theme.MARGIN_NARROW
	},
	transactionListContainer: {
		marginTop: theme.MARGIN_DEFAULT
	},
	transactionName: {
		...textHighlight
	},
	transactionTitleContainer: {
		flexDirection: 'column'
	},
	transactionValueContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	transactionValue: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	separator: {
		backgroundColor: theme.COLOR_GREY,
		opacity: 0.5,
		height: 1,
		marginBottom: theme.MARGIN_NARROW,
		marginLeft: (theme.MARGIN_DEFAULT + 40)
	},
	subHeaderText: {
		color: theme.COLOR_SOFT_GREY,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	credit: {
		color: theme.COLOR_RED,
	},
	debit: {
		color: theme.COLOR_GREEN,
	},
});