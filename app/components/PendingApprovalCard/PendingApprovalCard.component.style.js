import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, textHighlight, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	approvalDescriptionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between'
	},
	actionDetailIcon: {
		color: theme.COLOR_GREY,
		marginLeft: theme.MARGIN_NARROW
	},
	approvalItem: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		height: 48,
		paddingHorizontal: theme.PADDING_DEFAULT,
		paddingVertical: theme.PADDING_EXTRA_NARROW
	},
	approvalItemIcon: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		marginRight: theme.MARGIN_DEFAULT,
		textAlign: 'center',
		width: 24
	},
	actionName: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
	},
	container: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		overflow: 'hidden'
	},
	header: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		margin: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_EXTRA_NARROW
	},
	subHeader: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_MEDIUM,
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_NARROW
	},
	transactionDetailContainer: {
		flexDirection: 'row'
	},
	transactionGroupName: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_TINY
	},
	transactionImage: {
		borderRadius: 48/2,
		flexGrow: 0,
		height: 48,
		marginRight: theme.MARGIN_DEFAULT,
		width: 48
	},
	transactionListContainer: {
		marginTop: theme.MARGIN_DEFAULT
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
});