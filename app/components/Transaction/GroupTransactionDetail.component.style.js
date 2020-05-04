import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	approvalContainer: {
		flexDirection: 'row',
		flex: 1,
		margin: theme.MARGIN_DEFAULT,
		// marginTop: 0
	},
	approveButton: {
		backgroundColor: theme.COLOR_GREEN,
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
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
		textAlign: 'center'
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	rejectButton: {
		backgroundColor: theme.COLOR_RED,
		flex: 1,
		marginRight: theme.MARGIN_NARROW
	},
	rootContainer: {
		...rootContainer
	},
	transactionDetailContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE
	},
	transactionDetail: {
		alignItems: 'center',
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.PADDING_DEFAULT
	},
	transactionDetailIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	transactionDetailText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	transactionDetailValue: {
		color: theme.COLOR_SOFT_GREY
	},
	valueText: {
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center',
		margin: theme.MARGIN_DEFAULT
	},
	debit: {
		color: theme.COLOR_DARK_RED
	},
	credit: {
		color: theme.COLOR_GREEN
	},
	viewImageContainer: {
		flex: 1
	},
	viewImage: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		height: 40,
		justifyContent: 'center',
		marginRight: theme.MARGIN_NARROW,
	},
	viewImageText: {
		...textHighlight,
		color: theme.COLOR_WHITE
	}
});